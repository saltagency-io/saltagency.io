import * as React from 'react'

import type {
  ActionFunction,
  HeadersFunction,
  MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import { useFetcher, useSearchParams } from '@remix-run/react'
import type { LoaderFunctionArgs } from '@remix-run/router'

import ReCaptcha from 'react-google-recaptcha'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import { Button } from '~/components/button'
import {
  ErrorPanel,
  Field,
  InputError,
  Select,
} from '~/components/form-elements'
import { Grid } from '~/components/grid'
import { H1, H2, Paragraph } from '~/components/typography'
import { getAllVacancies } from '~/lib/api'
import { sendCaptcha } from '~/lib/captcha'
import { sendApplicationToNotion } from '~/lib/notion'
import type { LoaderData as RootLoaderData } from '~/root'
import { handleFormSubmission } from '~/utils/actions.server'
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
  isValidUrl,
} from '~/utils/validators'

export async function loader({ request }: LoaderFunctionArgs) {
  const preview = isPreview(request)
  const vacancies = await getAllVacancies(preview)

  const data = {
    vacancies,
  }

  const headers = {
    'Cache-Control': 'private, max-age=3600',
  }

  return typedjson(data, { status: 200, headers })
}

type ActionData = {
  status: 'success' | 'error'
  fields: {
    generalError?: string
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
  errors: {
    generalError?: string
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

export const meta: MetaFunction = ({ parentsData }) => {
  const { requestInfo } = parentsData.root as RootLoaderData
  return {
    ...getSocialMetas({
      title: 'Apply for this job | Salt',
      description: 'Apply for this job.',
      url: getUrl(requestInfo),
    }),
  }
}

export const headers: HeadersFunction = () => ({
  'Cache-Control': 'private, max-age=3600',
})

export default function ApplyPage() {
  const data = useTypedLoaderData<typeof loader>()
  const applyFetcher = useFetcher<ActionData>()
  const [searchParams] = useSearchParams()
  const { t, to } = useLabels()

  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null)

  const messageSuccessfullySent =
    applyFetcher.type === 'done' && applyFetcher.data.status === 'success'

  return (
    <main>
      <Grid>
        <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-4">
          {messageSuccessfullySent ? (
            <div className="min-h-[60vh]">
              <H2>{t('form.apply.success')}</H2>
            </div>
          ) : (
            <>
              <H1 className="mb-10">{t('apply.title')}</H1>
              <Paragraph>{t('apply.text')}</Paragraph>

              <applyFetcher.Form
                method="post"
                aria-describedby="apply-form-error"
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
                    {t('form.select.placeholder')}
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
                    {t('form.select.placeholder')}
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
                  <option value="" disabled>
                    {t('form.select.placeholder')}
                  </option>
                  {data.vacancies?.map((vacancy) => (
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
                  type="textarea"
                  rows={10}
                  defaultValue={applyFetcher.data?.fields.motivation ?? ''}
                  error={to(applyFetcher?.data?.errors.motivation)}
                />

                <div className="mb-10">
                  <ReCaptcha
                    theme="dark"
                    sitekey={getRequiredGlobalEnvVar('GOOGLE_CAPTCHA_KEY')}
                    onChange={setCaptchaValue}
                  />
                  {applyFetcher.data?.errors.captcha ? (
                    <InputError id="captcha-error">
                      {t(applyFetcher.data?.errors.captcha)}
                    </InputError>
                  ) : null}
                </div>

                {applyFetcher.data?.errors.generalError ? (
                  <ErrorPanel className="mb-8">
                    {t('form.apply.error')}
                  </ErrorPanel>
                ) : null}
                <Button type="submit" className="w-full">
                  {t('form.apply.submit')}
                </Button>
              </applyFetcher.Form>
            </>
          )}
        </div>
      </Grid>
    </main>
  )
}
