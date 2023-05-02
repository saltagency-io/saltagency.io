import * as React from 'react'

import type {
  ActionFunction,
  DataFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'

import { StoryblokComponent, useStoryblokState } from '@storyblok/react'

import ReCaptcha from 'react-google-recaptcha'
import {
  typedjson,
  UseDataFunctionReturn,
  useTypedLoaderData,
} from 'remix-typedjson'

import { Avatar } from '~/components/avatar'
import { Button } from '~/components/button'
import { ErrorPanel, Field, InputError } from '~/components/form-elements'
import { Grid } from '~/components/grid'
import { H3, H5, Paragraph } from '~/components/typography'
import { sendCaptcha } from '~/lib/captcha.server'
import { sendToContactFormNotion } from '~/lib/notion.server'
import { getStoryBySlug } from '~/lib/storyblok.server'
import type { LoaderData as RootLoaderData } from '~/root'
import type { Handle } from '~/types'
import { handleFormSubmission } from '~/utils/actions.server'
import type { DynamicLinksFunction } from '~/utils/dynamic-links'
import {
  defaultLocale,
  getLocaleFromContext,
  getStaticLabel,
} from '~/utils/i18n'
import { useLabels } from '~/utils/labels-provider'
import {
  createAlternateLinks,
  getLabelKeyForError,
  getRequiredGlobalEnvVar,
  getUrl,
} from '~/utils/misc'
import { getSocialMetas } from '~/utils/seo'
import { getTranslatedSlugsFromStory, isPreview } from '~/utils/storyblok'
import {
  isValidBody,
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
  isValidString,
} from '~/utils/validators'

const dynamicLinks: DynamicLinksFunction<
  UseDataFunctionReturn<typeof loader>
> = ({ data, parentsData }) => {
  const requestInfo = parentsData[0].requestInfo
  const slugs = getTranslatedSlugsFromStory(data?.story)
  return createAlternateLinks(slugs, requestInfo.origin)
}

export const handle: Handle = {
  getSitemapEntries: (locale) => {
    return [
      {
        route: `${locale === defaultLocale ? '' : `/${locale}`}/contact`,
        priority: 0.4,
      },
    ]
  },
  dynamicLinks,
}

export async function loader({ request, context }: DataFunctionArgs) {
  const preview = isPreview(request)
  const locale = getLocaleFromContext(context)
  const story = await getStoryBySlug('contact', locale, preview)

  if (!story) {
    throw json({}, { status: 404 })
  }

  const data = {
    story,
    preview,
  }

  return typedjson(data, {
    status: 200,
    headers: {
      'Cache-Control': 'private, max-age=3600',
    },
  })
}

export const meta: MetaFunction = ({ data, parentsData }) => {
  const { requestInfo, locale } = parentsData.root as RootLoaderData

  if (data?.story) {
    const meta = data.story.content.metatags
    return {
      ...getSocialMetas({
        title: meta.title,
        description: meta.description,
        url: getUrl(requestInfo),
        image: meta.og_image,
      }),
    }
  } else {
    return {
      title: getStaticLabel('404.meta.title', locale),
      description: getStaticLabel('404.meta.description', locale),
    }
  }
}

type Fields = {
  name?: string | null
  email?: string | null
  phone?: string | null
  body?: string | null
  captcha?: string | null
}

type ActionData = {
  status: 'success' | 'error'
  fields: Fields
  errors: Fields & { generalError?: string }
}

export const action: ActionFunction = async ({ request }) => {
  return handleFormSubmission<ActionData>({
    request,
    validators: {
      name: getLabelKeyForError(isValidName, 'form.name.error'),
      email: getLabelKeyForError(isValidEmail, 'form.email.error'),
      phone: getLabelKeyForError(isValidPhoneNumber, 'form.phone.error'),
      body: getLabelKeyForError(isValidBody, 'form.message.error'),
      captcha: getLabelKeyForError(isValidString, 'form.captcha.error'),
    },
    handleFormValues: async (fields) => {
      const captchaResult = await sendCaptcha(fields.captcha)
      if (!captchaResult.success) {
        const actionData: ActionData = { fields, status: 'error', errors: {} }
        return json(actionData, { status: 400 })
      }

      await sendToContactFormNotion(fields)

      const actionData: ActionData = { fields, status: 'success', errors: {} }
      return json(actionData)
    },
  })
}

export default function ContactPage() {
  const { t, to } = useLabels()
  const contactFetcher = useFetcher<ActionData>()
  const data = useTypedLoaderData<typeof loader>()
  const story = useStoryblokState(data.story, {}, data.preview)

  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null)

  const messageSuccessfullySent =
    contactFetcher.type === 'done' && contactFetcher.data.status === 'success'

  React.useEffect(() => {
    if (window.fathom && messageSuccessfullySent) {
      window.fathom.trackGoal('BDSMAWUC', 0)
    }
  }, [messageSuccessfullySent])

  return (
    <main>
      <StoryblokComponent blok={story.content}>
        <Grid className="lg:pb-42 pt-8 pb-16 lg:pt-24">
          <div className="col-span-full lg:col-span-5">
            <H5 as="p" variant="secondary" className="mb-8 lg:mb-0">
              {t('contact.text')}
            </H5>
          </div>
          <div className="col-span-full lg:col-span-7 lg:px-8">
            {messageSuccessfullySent ? (
              <div className="min-h-[50vh]">
                <H3 as="span">{t('form.contact.success')}</H3>
              </div>
            ) : (
              <contactFetcher.Form
                method="post"
                aria-describedby="contact-form-error"
              >
                <input
                  type="hidden"
                  name="captcha"
                  value={captchaValue ?? ''}
                  readOnly
                />
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

                <div className="mb-8 flex items-center gap-x-4 rounded-lg bg-gray-100 py-4 px-6">
                  <Avatar
                    url="https://a.storyblok.com/f/198542/236x236/9a05e3ee75/dennis-round.png"
                    alt="Dennis"
                    theme="white"
                    size="small"
                  />
                  <Paragraph textColorClassName="text-gray-700" size="lg">
                    <strong className="text-gray-900">
                      {t('contact.response.name')}
                    </strong>{' '}
                    {t('contact.response')}
                  </Paragraph>
                </div>

                <div className="mb-8">
                  <div className="h-[78px]">
                    <ReCaptcha
                      theme="light"
                      sitekey={getRequiredGlobalEnvVar('GOOGLE_CAPTCHA_KEY')}
                      onChange={setCaptchaValue}
                    />
                  </div>
                  {contactFetcher.data?.errors.captcha ? (
                    <InputError id="captcha-error">
                      {t(contactFetcher.data?.errors.captcha)}
                    </InputError>
                  ) : null}
                </div>

                {contactFetcher.data?.errors.generalError ? (
                  <ErrorPanel className="mb-8" id="contact-form-error">
                    {t('form.contact.error')}
                  </ErrorPanel>
                ) : null}
                <Button type="submit" className="w-full" variant="secondary">
                  {t('form.contact.submit')}
                </Button>
              </contactFetcher.Form>
            )}
          </div>
        </Grid>
      </StoryblokComponent>
    </main>
  )
}