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
import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import { Avatar } from '~/components/avatar'
import { Button } from '~/components/button'
import { ErrorPanel, Field, InputError } from '~/components/form-elements'
import { Grid } from '~/components/grid'
import { Spacer } from '~/components/spacer'
import { H1, H3, H4, Paragraph } from '~/components/typography'
import { sendCaptcha } from '~/lib/captcha.server'
import { sendToContactFormNotion } from '~/lib/notion.server'
import { getStoryBySlug } from '~/lib/storyblok.server'
import type { LoaderData as RootLoaderData } from '~/root'
import { handleFormSubmission } from '~/utils/actions.server'
import * as ga from '~/utils/gtag.client'
import { useLabels } from '~/utils/labels-provider'
import { getRequiredGlobalEnvVar, getUrl } from '~/utils/misc'
import { getSocialMetas } from '~/utils/seo'
import { isPreview } from '~/utils/storyblok'
import type { ValidateFn } from '~/utils/validators'
import {
  isValidBody,
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
  isValidString,
} from '~/utils/validators'

export async function loader({ request }: DataFunctionArgs) {
  const preview = isPreview(request)
  const initialStory = await getStoryBySlug('contact', preview)

  if (!initialStory) {
    throw json({}, { status: 404 })
  }

  const data = {
    initialStory,
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
  const { requestInfo } = parentsData.root as RootLoaderData

  if (data?.initialStory) {
    const meta = data.initialStory.content.metatags
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
      title: 'Not found',
      description: 'You landed on a page that we could not find 😢',
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

const getLabelKeyForError =
  (validator: ValidateFn, errorKey: string) => (val: string | null) => {
    const valid = validator(val)
    return valid ? null : errorKey
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
  const story = useStoryblokState(data.initialStory, {}, data.preview)

  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null)

  const messageSuccessfullySent =
    contactFetcher.type === 'done' && contactFetcher.data.status === 'success'

  React.useEffect(() => {
    if (messageSuccessfullySent) {
      ga.event({
        action: 'conversion',
        group: getRequiredGlobalEnvVar('GOOGLE_AW_CONVERSION_EVENT'),
      })
    }
  }, [messageSuccessfullySent])

  return (
    <main>
      <Grid className="pt-8 pb-16 lg:pt-24 lg:pb-56">
        <div className="col-span-full lg:col-span-5">
          <H1 className="mb-4 lg:mb-8">{t('contact.title')}</H1>
          <H4 as="h2" variant="secondary">
            {t('contact.subtitle')}
          </H4>
        </div>
        <div className="col-span-full py-10 lg:col-span-7 lg:py-3 lg:px-8">
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
                autoFocus
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
      <StoryblokComponent blok={story.content} />
      <Spacer className="hidden bg-gray-900 lg:block" size="sm" />
    </main>
  )
}
