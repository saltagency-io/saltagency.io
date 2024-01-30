import * as React from 'react'

import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { StoryblokComponent, useStoryblokState } from '@storyblok/react'
import clsx from 'clsx'

import { Button } from '#app/components/button.tsx'
import { ErrorPanel, Field } from '#app/components/form-elements.tsx'
import { Grid } from '#app/components/grid.tsx'
import { Spinner } from '#app/components/spinner.tsx'
import { H3, H5 } from '#app/components/typography.tsx'
import { sendToContactFormNotion } from '#app/lib/notion.server.ts'
import { getStoryBySlug } from '#app/lib/storyblok.server.ts'
import { type RootLoaderType } from '#app/root.tsx'
import { type Handle } from '#app/types.ts'
import { handleFormSubmission } from '#app/utils/actions.server.ts'
import { type DynamicLinksFunction } from '#app/utils/dynamic-links.ts'
import {
  defaultLanguage,
  getLanguageFromContext,
  getStaticLabel,
} from '#app/utils/i18n.ts'
import { useLabels } from '#app/utils/labels-provider.tsx'
import {
  createAlternateLinks,
  getLabelKeyForError,
  getUrl,
} from '#app/utils/misc.tsx'
import { getSocialMetas } from '#app/utils/seo.ts'
import {
  getTranslatedSlugsFromStory,
  isPreview,
} from '#app/utils/storyblok.tsx'
import {
  isValidBody,
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
} from '#app/utils/validators.ts'

// TODO: remove the any
const dynamicLinks: DynamicLinksFunction<any> = ({ data, parentsData }) => {
  const requestInfo = parentsData[0].requestInfo
  const slugs = getTranslatedSlugsFromStory(data?.story)
  return createAlternateLinks(slugs, requestInfo.origin)
}

export const handle: Handle = {
  getSitemapEntries: language => {
    return [
      {
        route: `${language === defaultLanguage ? '' : `/${language}`}/contact`,
        priority: 0.4,
      },
    ]
  },
  dynamicLinks,
}

export async function loader({ request, context }: LoaderFunctionArgs) {
  const preview = isPreview(request)
  const language = getLanguageFromContext(context)
  const story = await getStoryBySlug('contact', language, preview)

  if (!story) {
    throw json({}, { status: 404 })
  }

  const data = {
    story,
    preview,
  }

  return json(data, {
    status: 200,
    headers: {
      'Cache-Control': 'private, max-age=3600',
    },
  })
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

type Fields = {
  name?: string | null
  email?: string | null
  phone?: string | null
  body?: string | null
}

type ActionData = {
  status: 'success' | 'error'
  fields: Fields
  errors: Fields & { generalError?: string }
}

export async function action({ request }: ActionFunctionArgs) {
  return handleFormSubmission<ActionData>({
    request,
    validators: {
      name: getLabelKeyForError(isValidName, 'form.name.error'),
      email: getLabelKeyForError(isValidEmail, 'form.email.error'),
      phone: getLabelKeyForError(isValidPhoneNumber, 'form.phone.error'),
      body: getLabelKeyForError(isValidBody, 'form.message.error'),
    },
    handleFormValues: async fields => {
      await sendToContactFormNotion(fields)

      const actionData: ActionData = { fields, status: 'success', errors: {} }
      return json(actionData)
    },
  })
}

export default function ContactRoute() {
  const { t, to } = useLabels()
  const contactFetcher = useFetcher<ActionData>()
  const data = useLoaderData<typeof loader>()
  const story = useStoryblokState(data.story, {})

  const messageSuccessfullySent =
    contactFetcher.type === 'done' && contactFetcher.data.status === 'success'

  const messageSubmitted = contactFetcher.type === 'actionSubmission'

  React.useEffect(() => {
    if (window.fathom && messageSuccessfullySent) {
      window.fathom.trackGoal('BDSMAWUC', 0)
    }
  }, [messageSuccessfullySent])

  return (
    <main>
      <StoryblokComponent blok={story.content}>
        <Grid className="lg:pb-42 pb-16 pt-8 lg:pt-24">
          <div className="col-span-full lg:col-span-5">
            <H5 as="h2" variant="secondary" className="mb-4">
              {t('contact.sectionTitle')}
            </H5>
            <H3 className="mb-4">{t('contact.bodyTitle')}</H3>
            <p className="mb-4">{t('contact.body')}</p>
          </div>
          <div className="col-span-full lg:col-span-6 lg:col-start-7">
            {messageSuccessfullySent ? (
              <div className="min-h-[50vh]">
                <H3 as="span">{t('form.contact.success')}</H3>
              </div>
            ) : (
              <contactFetcher.Form
                method="post"
                aria-describedby="contact-form-error"
              >
                <Field
                  name="name"
                  label={t('form.name.label')}
                  placeholder={t('form.name.placeholder')}
                  autoComplete="name"
                  defaultValue={contactFetcher.data?.fields.name ?? ''}
                  error={to(contactFetcher?.data?.errors.name)}
                />
                <Field
                  name="email"
                  label={t('form.email.label')}
                  placeholder={t('form.email.placeholder')}
                  type="email"
                  autoComplete="email"
                  defaultValue={contactFetcher.data?.fields.email ?? ''}
                  error={to(contactFetcher?.data?.errors.email)}
                />
                <Field
                  name="phone"
                  label={t('form.phone.label')}
                  placeholder={t('form.phone.placeholder')}
                  type="tel"
                  autoComplete="tel"
                  defaultValue={contactFetcher.data?.fields.phone ?? ''}
                  error={to(contactFetcher?.data?.errors.phone)}
                />
                <Field
                  name="body"
                  className="mb-6"
                  label={t('form.message.label')}
                  placeholder={t('form.message.placeholder')}
                  type="textarea"
                  rows={8}
                  defaultValue={contactFetcher.data?.fields.body ?? ''}
                  error={to(contactFetcher?.data?.errors.body)}
                />

                {contactFetcher.data?.errors.generalError ? (
                  <ErrorPanel className="mb-8" id="contact-form-error">
                    {t('form.contact.error')}
                  </ErrorPanel>
                ) : null}
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    variant="primary"
                    className="relative mx-auto flex w-full justify-center"
                    disabled={messageSubmitted}
                  >
                    <span
                      className={clsx(
                        messageSubmitted ? 'opacity-0' : 'opacity-100',
                      )}
                    >
                      {t('form.contact.submit')}
                    </span>
                    {messageSubmitted && (
                      <div
                        hidden={!messageSubmitted}
                        className="absolute inset-0 z-10 flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <Spinner />
                      </div>
                    )}
                  </Button>
                </div>
              </contactFetcher.Form>
            )}
          </div>
        </Grid>
      </StoryblokComponent>
    </main>
  )
}
