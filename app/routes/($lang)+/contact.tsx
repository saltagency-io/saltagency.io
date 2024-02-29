import * as React from 'react'

import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { StoryblokComponent, useStoryblokState } from '@storyblok/react'
import clsx from 'clsx'
import { type TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'
import { AuthenticityTokenInput } from 'remix-utils/csrf/react'
import { HoneypotInputs } from 'remix-utils/honeypot/react'
import { z } from 'zod'

import { ErrorList, Field } from '#app/components/form-elements.tsx'
import { Grid } from '#app/components/grid.tsx'
import { Button } from '#app/components/ui/button'
import { Spinner } from '#app/components/ui/spinner'
import { H3, H5 } from '#app/components/ui/typography'
import { type RootLoaderType } from '#app/root.tsx'
import { type Handle } from '#app/types.ts'
import { validateCSRF } from '#app/utils/csrf.server.ts'
import { checkHoneypot } from '#app/utils/honeypot.server.ts'
import { defaultLanguage, getLocaleFromRequest } from '#app/utils/i18n.ts'
import { i18next } from '#app/utils/i18next.server.ts'
import { getJsonLdLogo } from '#app/utils/json-ld.ts'
import { createAlternateLinks, getUrl, useIsPending } from '#app/utils/misc.tsx'
import { sendToContactFormNotion } from '#app/utils/notion.server'
import { getSocialMetas } from '#app/utils/seo.ts'
import { getStoryBySlug } from '#app/utils/storyblok-api.ts'
import {
  getTranslatedSlugsFromStory,
  isPreview,
} from '#app/utils/storyblok.tsx'
import {
  getEmailSchema,
  getMessageSchema,
  getNameSchema,
  getPhoneSchema,
} from '#app/utils/validation.ts'

export const handle: Handle = {
  getSitemapEntries: request => {
    const locale = getLocaleFromRequest(request)
    return [
      {
        route: `${locale === defaultLanguage ? '' : `/${locale}`}/contact`,
        priority: 0.4,
      },
    ]
  },
}

function getContactFormSchema(t: TFunction, locale: string) {
  return z.object({
    name: getNameSchema(t, locale),
    email: getEmailSchema(t, locale),
    phone: getPhoneSchema(t, locale),
    body: getMessageSchema(t, locale),
  })
}

export async function loader({ request }: LoaderFunctionArgs) {
  const preview = isPreview(request)
  const locale = getLocaleFromRequest(request)
  const story = await getStoryBySlug('contact', locale, preview)

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
      { title: rootData.errorLabels.title },
      {
        name: 'description',
        content: rootData.errorLabels.title,
      },
    ]
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const locale = getLocaleFromRequest(request)
  const t = await i18next.getFixedT(request)

  await validateCSRF(formData, request.headers)
  checkHoneypot(formData)

  const submission = await parseWithZod(formData, {
    schema: getContactFormSchema(t, locale),
    async: true,
  })
  if (submission.status !== 'success' || !submission.value) {
    return json(
      { result: submission.reply() },
      { status: submission.status === 'error' ? 400 : 200 },
    )
  }

  await sendToContactFormNotion(submission.value)

  return json({ result: submission.reply() })
}

export default function ContactRoute() {
  const { t, i18n } = useTranslation()
  const data = useTypedLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const story = useStoryblokState(data.story)
  const isPending = useIsPending()

  const [form, fields] = useForm({
    id: 'contact-form',
    constraint: getZodConstraint(getContactFormSchema(t, i18n.language)),
    lastResult: actionData?.result,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: getContactFormSchema(t, i18n.language),
      })
    },
    shouldRevalidate: 'onBlur',
  })

  React.useEffect(() => {
    if (actionData?.result.status === 'success') {
      window.scrollTo({ top: 0 })
      if (window.fathom) {
        window.fathom.trackGoal('BDSMAWUC', 0)
      }
    }
  }, [actionData?.result.status])

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
            {actionData?.result.status === 'success' ? (
              <div className="min-h-[50vh]">
                <H3 as="span">{t('form.contact.success')}</H3>
              </div>
            ) : (
              <Form method="POST" {...getFormProps(form)}>
                <AuthenticityTokenInput />
                <HoneypotInputs />
                <Field
                  {...getInputProps(fields.name, { type: 'text' })}
                  autoComplete="name"
                  autoFocus
                  label={t('form.name.label')}
                  placeholder={t('form.name.placeholder')}
                  errors={fields.name.errors}
                />
                <Field
                  {...getInputProps(fields.email, { type: 'email' })}
                  label={t('form.email.label')}
                  placeholder={t('form.email.placeholder')}
                  autoComplete="email"
                  errors={fields.email.errors}
                />
                <Field
                  {...getInputProps(fields.phone, { type: 'tel' })}
                  label={t('form.phone.label')}
                  placeholder={t('form.phone.placeholder')}
                  autoComplete="tel"
                  errors={fields.phone.errors}
                />
                <Field
                  {...getTextareaProps(fields.body)}
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
