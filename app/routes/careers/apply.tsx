import * as React from 'react'

import type {
  ActionFunction,
  HeadersFunction,
  MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import { useFetcher, useSearchParams } from '@remix-run/react'

import ReCaptcha from 'react-google-recaptcha'

import { Button } from '~/components/button'
import {
  ErrorPanel,
  Field,
  InputError,
  Select,
} from '~/components/form-elements'
import { Grid } from '~/components/grid'
import { H1, H3, H4 } from '~/components/typography'
import { sendCaptcha } from '~/lib/captcha.server'
import { sendApplicationToNotion } from '~/lib/notion.server'
import type { LoaderData as RootLoaderData } from '~/root'
import { handleFormSubmission } from '~/utils/actions.server'
import * as ga from '~/utils/google-analytics.client'
import { useLabels } from '~/utils/labels-provider'
import { getRequiredGlobalEnvVar, getUrl } from '~/utils/misc'
import { useVacancies } from '~/utils/providers'
import { getSocialMetas } from '~/utils/seo'
import type { ValidateFn } from '~/utils/validators'
import {
  isValidBody,
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
  isValidString,
  isValidUrl,
} from '~/utils/validators'

type Fields = {
  name?: string | null
  email?: string | null
  phone?: string | null
  employment?: string | null
  citizenship?: string | null
  role?: string | null
  linkedin?: string | null
  motivation?: string | null
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
      employment: getLabelKeyForError(isValidString, 'form.employment.error'),
      citizenship: getLabelKeyForError(isValidString, 'form.citizenship.error'),
      role: getLabelKeyForError(isValidString, 'form.role.error'),
      linkedin: getLabelKeyForError(isValidUrl, 'form.linkedin.error'),
      motivation: getLabelKeyForError(isValidBody, 'form.motivation.error'),
      captcha: getLabelKeyForError(isValidString, 'form.captcha.error'),
    },
    handleFormValues: async (fields) => {
      const captchaResult = await sendCaptcha(fields.captcha)
      if (!captchaResult.success) {
        const actionData: ActionData = { fields, status: 'error', errors: {} }
        return json(actionData, { status: 400 })
      }

      await sendApplicationToNotion(fields)
      const actionData: ActionData = { fields, status: 'success', errors: {} }
      return json(actionData)
    },
  })
}

export const meta: MetaFunction = ({ parentsData, location }) => {
  const { requestInfo } = parentsData.root as RootLoaderData
  const params = new URLSearchParams(location.search)
  const role = params.get('role')

  return {
    ...getSocialMetas({
      title: `Apply for ${role} | Salt`,
      description: `Apply for ${role} at Salt. Do you love to be part an excitingly new and ambitious consultancy startup?`,
      url: getUrl(requestInfo),
    }),
  }
}

export const headers: HeadersFunction = () => ({
  'Cache-Control': 'private, max-age=3600',
})

export default function ApplyPage() {
  const applyFetcher = useFetcher<ActionData>()
  const [searchParams] = useSearchParams()
  const { t, to } = useLabels()
  const { vacancies } = useVacancies()

  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null)

  const messageSuccessfullySent =
    applyFetcher.type === 'done' && applyFetcher.data.status === 'success'

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
      <Grid className="pt-12 pb-20 lg:pt-24 lg:pb-56">
        <div className="col-span-full lg:col-span-5">
          <H1 className="mb-4 lg:mb-8">{t('apply.title')}</H1>
          <H4 as="h2" variant="secondary">
            {t('apply.text')}
          </H4>
        </div>
        <div className="col-span-full py-10 lg:col-span-7 lg:py-3 lg:px-8">
          {messageSuccessfullySent ? (
            <div className="min-h-[60vh]">
              <H3 as="span">{t('form.apply.success')}</H3>
            </div>
          ) : (
            <applyFetcher.Form
              method="post"
              aria-describedby="apply-form-error"
            >
              <input type="hidden" name="captcha" value={captchaValue ?? ''} />
              <Field
                name="name"
                className="mb-6"
                label={t('form.name.label')}
                placeholder={t('form.name.placeholder')}
                autoComplete="name"
                autoFocus
                defaultValue={applyFetcher.data?.fields.name ?? ''}
                error={to(applyFetcher?.data?.errors.name)}
              />
              <Field
                name="email"
                className="mb-6"
                label={t('form.email.label')}
                placeholder={t('form.email.placeholder')}
                type="email"
                autoComplete="email"
                defaultValue={applyFetcher.data?.fields.email ?? ''}
                error={to(applyFetcher?.data?.errors.email)}
              />
              <Field
                name="phone"
                className="mb-6"
                label={t('form.phone.label')}
                placeholder={t('form.phone.placeholder')}
                type="tel"
                autoComplete="tel"
                defaultValue={applyFetcher.data?.fields.phone ?? ''}
                error={to(applyFetcher?.data?.errors.phone)}
              />
              <Select
                name="employment"
                className="text-primary mb-6"
                label={t('form.employment.label')}
                defaultValue={applyFetcher.data?.fields.employment ?? ''}
                error={to(applyFetcher?.data?.errors.employment)}
                required
              >
                <option value="" disabled>
                  {t('form.employment.placeholder')}
                </option>
                <option value="employed">
                  {t('form.employment.option.employed')}
                </option>
                <option value="searching">
                  {t('form.employment.option.searching')}
                </option>
                <option value="freelance">
                  {t('form.employment.option.freelance')}
                </option>
              </Select>
              <Select
                name="citizenship"
                className="text-primary mb-6"
                label={t('form.citizenship.label')}
                defaultValue={applyFetcher.data?.fields.citizenship ?? ''}
                error={to(applyFetcher?.data?.errors.citizenship)}
                required
              >
                <option value="" disabled>
                  {t('form.citizenship.placeholder')}
                </option>
                <option value="dutch">
                  {t('form.citizenship.option.dutch')}
                </option>
                <option value="expat">
                  {t('form.citizenship.option.expat')}
                </option>
                <option value="relocation">
                  {t('form.citizenship.option.relocation')}
                </option>
              </Select>
              <Select
                name="role"
                className="text-primary mb-6"
                label={t('form.role.label')}
                defaultValue={
                  applyFetcher.data?.fields.role ??
                  searchParams.get('role') ??
                  ''
                }
                error={to(applyFetcher?.data?.errors.role)}
                required
              >
                {vacancies.map((vacancy) => (
                  <option key={vacancy.uuid} value={vacancy.name}>
                    {vacancy.name}
                  </option>
                ))}
              </Select>
              <Field
                name="linkedin"
                className="mb-6"
                label={t('form.linkedin.label')}
                placeholder={t('form.linkedin.placeholder')}
                type="url"
                defaultValue={applyFetcher.data?.fields.linkedin ?? ''}
                error={to(applyFetcher?.data?.errors.linkedin)}
              />
              <Field
                name="motivation"
                className="mb-6"
                label={t('form.motivation.label')}
                placeholder={t('form.motivation.placeholder')}
                type="textarea"
                rows={10}
                defaultValue={applyFetcher.data?.fields.motivation ?? ''}
                error={to(applyFetcher?.data?.errors.motivation)}
              />

              <div className="mb-8">
                <div className="h-[78px]">
                  <ReCaptcha
                    theme="light"
                    sitekey={getRequiredGlobalEnvVar('GOOGLE_CAPTCHA_KEY')}
                    onChange={setCaptchaValue}
                  />
                </div>
                {applyFetcher.data?.errors.captcha ? (
                  <InputError id="captcha-error">
                    {t(applyFetcher.data?.errors.captcha)}
                  </InputError>
                ) : null}
              </div>

              {applyFetcher.data?.errors.generalError ? (
                <ErrorPanel className="mb-8" id="apply-form-error">
                  {t('form.apply.error')}
                </ErrorPanel>
              ) : null}
              <Button type="submit" className="w-full" variant="secondary">
                {t('form.apply.submit')}
              </Button>
            </applyFetcher.Form>
          )}
        </div>
      </Grid>
    </main>
  )
}
