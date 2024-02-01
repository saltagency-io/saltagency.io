import * as React from 'react'

import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { StoryblokComponent, useStoryblokState } from '@storyblok/react'
import clsx from 'clsx'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'
import { AuthenticityTokenInput } from 'remix-utils/csrf/react'
import { HoneypotInputs } from 'remix-utils/honeypot/react'
import { z } from 'zod'

import { Button } from '#app/components/button.tsx'
import { ErrorList, Field } from '#app/components/form-elements.tsx'
import { Grid } from '#app/components/grid.tsx'
import { Spinner } from '#app/components/spinner.tsx'
import { H3, H5 } from '#app/components/typography.tsx'
import { sendToContactFormNotion } from '#app/lib/notion.server.ts'
import { getStoryBySlug } from '#app/lib/storyblok.server.ts'
import { type RootLoaderType } from '#app/root.tsx'
import { type Handle } from '#app/types.ts'
import { validateCSRF } from '#app/utils/csrf.server'
import { checkHoneypot } from '#app/utils/honeypot.server'
import {
  defaultLanguage,
  getLanguageFromContext,
  getLanguageFromPath,
  getStaticLabel,
} from '#app/utils/i18n.ts'
import { getJsonLdLogo } from '#app/utils/json-ld.ts'
import { useLabels } from '#app/utils/labels-provider.tsx'
import { createAlternateLinks, getUrl, useIsPending } from '#app/utils/misc.tsx'
import { getSocialMetas } from '#app/utils/seo.ts'
import {
  getTranslatedSlugsFromStory,
  isPreview,
} from '#app/utils/storyblok.tsx'
import {
  EmailSchema,
  MessageSchema,
  NameSchema,
  PhoneSchema,
} from '#app/utils/validation.ts'

export const handle: Handle = {
  getSitemapEntries: request => {
    const { pathname } = new URL(request.url)
    const language = getLanguageFromPath(pathname)
    return [
      {
        route: `${language === defaultLanguage ? '' : `/${language}`}/contact`,
        priority: 0.4,
      },
    ]
  },
}

const ContactFormSchema = z.object({
  name: NameSchema,
  email: EmailSchema,
  phone: PhoneSchema,
  body: MessageSchema,
})

export async function loader({ request, context }: LoaderFunctionArgs) {
  const preview = isPreview(request)
  const language = getLanguageFromContext(context)
  const story = await getStoryBySlug('contact', language, preview)

  if (!story) {
    throw new Response('Not found', { status: 404 })
  }

  return typedjson(
    {
      story,
      preview,
    },
    {
      headers: {
        'Cache-Control': 'private, max-age=3600',
      },
    },
  )
}

export const meta: MetaFunction<typeof loader, { root: RootLoaderType }> = ({
  data,
  matches,
}) => {
  const rootData = matches.find(m => m.id === 'root')?.data
  const slugs = getTranslatedSlugsFromStory(data?.story)
  const altLinks = createAlternateLinks(slugs, rootData.requestInfo.origin)

  if (data?.story) {
    const meta = data.story.content.metatags
    return [
      ...getSocialMetas({
        title: meta?.title,
        description: meta?.description,
        image: meta?.og_image,
        url: getUrl(rootData.requestInfo),
      }),
      ...altLinks,
      { 'script:ld+json': getJsonLdLogo(rootData.requestInfo.origin) },
    ]
  } else {
    return [
      { title: getStaticLabel('404.meta.title', rootData.language) },
      {
        name: 'description',
        content: getStaticLabel('404.meta.description', rootData.language),
      },
    ]
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  await validateCSRF(formData, request.headers)
  checkHoneypot(formData)

  const submission = await parse(formData, {
    schema: ContactFormSchema,
    async: true,
  })
  if (submission.intent !== 'submit') {
    return json({ status: 'idle', submission } as const)
  }
  if (!submission.value) {
    return json({ status: 'error', submission } as const, { status: 400 })
  }

  await sendToContactFormNotion(submission.value)

  return json({ status: 'success', submission } as const)
}

export default function ContactRoute() {
  const { t } = useLabels()
  const data = useTypedLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const story = useStoryblokState(data.story)
  const isPending = useIsPending()

  const [form, fields] = useForm({
    id: 'contact-form',
    constraint: getFieldsetConstraint(ContactFormSchema),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: ContactFormSchema })
    },
    shouldRevalidate: 'onBlur',
  })

  React.useEffect(() => {
    if (actionData?.status === 'success') {
      window.scrollTo({ top: 0 })
      if (window.fathom) {
        window.fathom.trackGoal('BDSMAWUC', 0)
      }
    }
  }, [actionData?.status])

  return (
    <main>
      <StoryblokComponent blok={story?.content}>
        <Grid className="lg:pb-42 pb-16 pt-8 lg:pt-24">
          <div className="col-span-full lg:col-span-5">
            <H5 as="h2" variant="secondary" className="mb-4">
              {t('contact.sectionTitle')}
            </H5>
            <H3 className="mb-4">{t('contact.bodyTitle')}</H3>
            <p className="mb-4">{t('contact.body')}</p>
          </div>
          <div className="col-span-full lg:col-span-6 lg:col-start-7">
            {actionData?.status === 'success' ? (
              <div className="min-h-[50vh]">
                <H3 as="span">{t('form.contact.success')}</H3>
              </div>
            ) : (
              <Form method="POST" {...form.props}>
                <AuthenticityTokenInput />
                <HoneypotInputs />
                <Field
                  {...conform.input(fields.name)}
                  autoComplete="name"
                  autoFocus
                  label={t('form.name.label')}
                  placeholder={t('form.name.placeholder')}
                  errors={fields.name.errors}
                />
                <Field
                  {...conform.input(fields.email, { type: 'email' })}
                  label={t('form.email.label')}
                  placeholder={t('form.email.placeholder')}
                  autoComplete="email"
                  errors={fields.email.errors}
                />
                <Field
                  {...conform.input(fields.phone, { type: 'tel' })}
                  label={t('form.phone.label')}
                  placeholder={t('form.phone.placeholder')}
                  autoComplete="tel"
                  errors={fields.phone.errors}
                />
                <Field
                  {...conform.input(fields.body, { type: 'textarea' })}
                  className="mb-6"
                  label={t('form.message.label')}
                  placeholder={t('form.message.placeholder')}
                  type="textarea"
                  rows={8}
                  errors={fields.body.errors}
                />

                <ErrorList errors={form.errors} id={form.errorId} />

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    variant="primary"
                    className="relative mx-auto flex w-full justify-center"
                    disabled={isPending}
                  >
                    <span
                      className={clsx(isPending ? 'opacity-0' : 'opacity-100')}
                    >
                      {t('form.contact.submit')}
                    </span>
                    {isPending ? (
                      <div
                        hidden={!isPending}
                        className="absolute inset-0 z-10 flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <Spinner />
                      </div>
                    ) : null}
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </Grid>
      </StoryblokComponent>
    </main>
  )
}
