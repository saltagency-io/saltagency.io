import * as React from 'react'

import type {
  ActionFunction,
  HeadersFunction,
  MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'

import ReCaptcha from 'react-google-recaptcha'

import { Button } from '~/components/button'
import {
  ErrorPanel,
  Field,
  InputError,
  Select,
} from '~/components/form-elements'
import { Grid } from '~/components/grid'
import { H1, H2, H4, Paragraph } from '~/components/typography'
import { sendCaptcha } from '~/lib/captcha'
import { sendToContactFormNotion } from '~/lib/notion'
import type { LoaderData as RootLoaderData } from '~/root'
import { handleFormSubmission } from '~/utils/actions.server'
import { useLabels } from '~/utils/labels-provider'
import { getRequiredGlobalEnvVar, getUrl } from '~/utils/misc'
import { getSocialMetas } from '~/utils/seo'
import type { ValidateFn } from '~/utils/validators'
import {
  isValidBody,
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
  isValidString,
} from '~/utils/validators'

type ActionData = {
  status: 'success' | 'error'
  fields: {
    name?: string | null
    email?: string | null
    phone?: string | null
    reason?: string | null
    body?: string | null
    captcha?: string | null
  }
  errors: {
    generalError?: string
    name?: string | null
    email?: string | null
    phone?: string | null
    reason?: string | null
    body?: string | null
    captcha?: string | null
  }
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
      reason: getLabelKeyForError(isValidString, 'form.reason.error'),
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

export const meta: MetaFunction = ({ parentsData }) => {
  const { requestInfo } = parentsData.root as RootLoaderData
  return {
    ...getSocialMetas({
      title: 'Contact | Salt',
      description: 'Get in touch. We would love to hear from you',
      url: getUrl(requestInfo),
    }),
  }
}

export const headers: HeadersFunction = () => ({
  'Cache-Control': 'private, max-age=3600',
})

export default function ContactPage() {
  const contactFetcher = useFetcher<ActionData>()
  const { t, to } = useLabels()

  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null)

  const messageSuccessfullySent =
    contactFetcher.type === 'done' && contactFetcher.data.status === 'success'

  return (
    <main>
      <Grid>
        <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-4">
          {messageSuccessfullySent ? (
            <div className="min-h-[60vh]">
              <H2>{t('form.contact.success')}</H2>
            </div>
          ) : (
            <>
              <H1 className="mb-10">{t('contact.title')}</H1>
              <H4 as="h2" className="mb-4">
                {t('contact.subtitle')}
              </H4>
              <Paragraph>{t('contact.text')}</Paragraph>

              <contactFetcher.Form
                method="post"
                aria-describedby="contact-form-error"
                className="py-12"
              >
                <input
                  type="hidden"
                  name="captcha"
                  value={captchaValue ?? ''}
                />
                <Field
                  name="name"
                  className="mb-6"
                  label={t('form.name.label')}
                  placeholder={t('form.name.placeholder')}
                  autoComplete="name"
                  autoFocus
                  defaultValue={contactFetcher.data?.fields.name ?? ''}
                  error={to(contactFetcher?.data?.errors.name)}
                />
                <Field
                  name="email"
                  className="mb-6"
                  label={t('form.email.label')}
                  placeholder={t('form.email.placeholder')}
                  type="email"
                  autoComplete="email"
                  defaultValue={contactFetcher.data?.fields.email ?? ''}
                  error={to(contactFetcher?.data?.errors.email)}
                />
                <Field
                  name="phone"
                  className="mb-6"
                  label={t('form.phone.label')}
                  placeholder={t('form.phone.placeholder')}
                  type="tel"
                  autoComplete="tel"
                  defaultValue={contactFetcher.data?.fields.phone ?? ''}
                  error={to(contactFetcher?.data?.errors.phone)}
                />
                <Select
                  name="reason"
                  className="mb-6 text-white"
                  label={t('form.reason.label')}
                  defaultValue={contactFetcher.data?.fields.reason ?? ''}
                  error={to(contactFetcher?.data?.errors.reason)}
                >
                  <option value="" disabled>
                    {t('form.select.placeholder')}
                  </option>
                  <option value="consultancy">
                    {t('form.reason.option.consultancy')}
                  </option>
                  <option value="jobs">{t('form.reason.option.jobs')}</option>
                </Select>
                <Field
                  name="body"
                  className="mb-6"
                  label={t('form.message.label')}
                  type="textarea"
                  rows={8}
                  defaultValue={contactFetcher.data?.fields.body ?? ''}
                  error={to(contactFetcher?.data?.errors.body)}
                />

                <div className="mb-10">
                  <ReCaptcha
                    theme="dark"
                    sitekey={getRequiredGlobalEnvVar('GOOGLE_CAPTCHA_KEY')}
                    onChange={setCaptchaValue}
                  />
                  {contactFetcher.data?.errors.captcha ? (
                    <InputError id="captcha-error">
                      {t(contactFetcher.data?.errors.captcha)}
                    </InputError>
                  ) : null}
                </div>

                {contactFetcher.data?.errors.generalError ? (
                  <ErrorPanel className="mb-8">
                    {t('form.contact.error')}
                  </ErrorPanel>
                ) : null}
                <Button type="submit" className="w-full">
                  {t('form.contact.submit')}
                </Button>
              </contactFetcher.Form>
            </>
          )}
        </div>
      </Grid>
    </main>
  )
}
