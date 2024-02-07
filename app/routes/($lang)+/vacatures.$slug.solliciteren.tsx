import * as React from 'react'

import {
  getFormProps,
  getInputProps,
  getSelectProps,
  getTextareaProps,
  useForm,
} from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { Form, useActionData, useSearchParams } from '@remix-run/react'
import { type ISbStoryData as StoryData } from '@storyblok/react'
import clsx from 'clsx'
import { get } from 'lodash'
import { typedjson } from 'remix-typedjson'
import { AuthenticityTokenInput } from 'remix-utils/csrf/react'
import { HoneypotInputs } from 'remix-utils/honeypot/react'
import { z } from 'zod'

import { Breadcrumbs, createBreadcrumbs } from '#app/components/breadcrumbs.tsx'
import { ErrorList, Field, Select } from '#app/components/form-elements.tsx'
import { Grid } from '#app/components/grid.tsx'
import { Button } from '#app/components/ui/button'
import { Spinner } from '#app/components/ui/spinner'
import { H3, H5 } from '#app/components/ui/typography'
import { sendApplicationToNotion } from '#app/lib/notion.server.ts'
import { getAllVacancies, getVacancyBySlug } from '#app/lib/storyblok.server.ts'
import { type RootLoaderType } from '#app/root.tsx'
import { type Handle, type Vacancy } from '#app/types.ts'
import { validateCSRF } from '#app/utils/csrf.server.ts'
import { checkHoneypot } from '#app/utils/honeypot.server.ts'
import {
  defaultLanguage,
  getLanguageFromContext,
  getLanguageFromPath,
  getStaticLabel,
  type SupportedLanguage,
} from '#app/utils/i18n.ts'
import { getJsonLdBreadcrumbs, getJsonLdLogo } from '#app/utils/json-ld.ts'
import { useLabels } from '#app/utils/labels-provider.tsx'
import { createAlternateLinks, getUrl, useIsPending } from '#app/utils/misc.tsx'
import { useVacancies } from '#app/utils/providers.tsx'
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

export const routes: Record<SupportedLanguage, string> = {
  en: 'apply',
  nl: 'solliciteren',
}

export const handle: Handle = {
  getSitemapEntries: async request => {
    const { pathname } = new URL(request.url)
    const language = getLanguageFromPath(pathname)
    const pages = await getAllVacancies(language)
    return (pages || []).map(page => ({
      route: `/${page.full_slug}/${routes[language]}`,
      priority: 0.6,
    }))
  },
}

export async function loader({ params, request, context }: LoaderFunctionArgs) {
  if (!params.slug) {
    throw new Error('Slug is not defined!')
  }

  const preview = isPreview(request)
  const language = getLanguageFromContext(context)
  const { pathname } = new URL(request.url)

  let story = await getVacancyBySlug(params.slug, language, preview)

  if (!story) {
    throw new Response('Not found', { status: 404 })
  }

  // This is a bit of a hack but these pages do not exist is storyblok currently.
  story = {
    ...story,
    default_full_slug: `${story.default_full_slug}/${routes[defaultLanguage]}`,
    translated_slugs: (story.translated_slugs || []).map(slug => ({
      ...slug,
      path: `${slug.path}/${routes[slug.lang as SupportedLanguage]}`,
    })),
  }

  if (pathname !== `/${story.full_slug}/${routes[language]}`) {
    throw redirect(`/${story.full_slug}/${routes[language]}`)
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

const translatedTitle = (role: string, lang: SupportedLanguage) => {
  const titles = {
    en: `Apply for ${role} | Koodin`,
    nl: `Soliciteer op ${role} | Koodin`,
  }
  return titles[lang]
}

const translatedDescription = (role: string, lang: SupportedLanguage) => {
  const descriptions = {
    en: `Apply for ${role} at Koodin. Do you love to be part an excitingly new and ambitious consultancy startup?`,
    nl: `Soliciteer op ${role} at Koodin. Wil jij onderdeel zijn van een nieuwe en ambitieuze consultancy startup?`,
  }
  return descriptions[lang]
}

export const meta: MetaFunction<typeof loader, { root: RootLoaderType }> = ({
  data,
  matches,
  location,
}) => {
  const rootData = matches.find(m => m.id === 'root')?.data
  const slugs = getTranslatedSlugsFromStory(data?.story)
  const altLinks = createAlternateLinks(slugs, rootData.requestInfo.origin)
  const params = new URLSearchParams(location.search)
  const role = params.get('role') ?? ''
  const breadcrumbs = createBreadcrumbs(location.pathname, rootData.language)

  if (data?.story) {
    const meta = data.story.content.metatags
    return [
      ...getSocialMetas({
        title: translatedTitle(role, rootData.language),
        description: translatedDescription(role, rootData.language),
        image: meta?.og_image,
        url: getUrl(rootData.requestInfo),
      }),
      ...altLinks,
      { 'script:ld+json': getJsonLdLogo(rootData.requestInfo.origin) },
      {
        'script:ld+json': getJsonLdBreadcrumbs({
          breadcrumbs,
          origin: rootData.requestInfo.origin,
        }),
      },
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

const ApplicationFormSchema = z.object({
  name: NameSchema,
  email: EmailSchema,
  phone: PhoneSchema,
  employment: z.enum(['employed', 'searching', 'freelance'], {
    required_error: 'Selecteer een werkstatus optie.',
  }),
  citizenship: z.enum(['dutch', 'expat', 'relocation'], {
    required_error: 'Selecteer een nationaliteit optie.',
  }),
  role: z.string(),
  linkedin: z
    .string({ required_error: 'Dit veld is verplicht.' })
    .url({ message: 'Vul een geldige URL in.' }),
  motivation: MessageSchema,
})

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  await validateCSRF(formData, request.headers)
  checkHoneypot(formData)

  const vacancies = JSON.parse(
    String(formData.get('vacancies') ?? ''),
  ) as StoryData<Vacancy>[]

  const submission = await parseWithZod(formData, {
    async: true,
    schema: ApplicationFormSchema.superRefine(async (data, ctx) => {
      if (!(vacancies || []).find(v => v.name === data.role)) {
        ctx.addIssue({
          path: ['role'],
          code: z.ZodIssueCode.custom,
          message: 'Deze rol is momenteel niet beschikbaar.',
        })
        return
      }
    }),
  })
  if (submission.status !== 'success' || !submission.value) {
    return json(
      { result: submission.reply() },
      { status: submission.status === 'error' ? 400 : 200 },
    )
  }

  await sendApplicationToNotion(submission.value)

  return json({ result: submission.reply() })
}

export default function VacancyApplyRoute() {
  const actionData = useActionData<typeof action>()
  const [searchParams] = useSearchParams()
  const isPending = useIsPending()
  const { t } = useLabels()
  const { vacancies } = useVacancies()

  const [form, fields] = useForm({
    id: 'application-form',
    constraint: getZodConstraint(ApplicationFormSchema),
    lastResult: actionData?.result,
    shouldRevalidate: 'onBlur',
    defaultValue: {
      role: searchParams.get('role') ?? '',
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ApplicationFormSchema })
    },
  })

  React.useEffect(() => {
    if (actionData?.result.status === 'success') {
      window.scrollTo({ top: 0 })
      if (window.fathom) {
        window.fathom.trackGoal('51XZFYES', 0)
      }
    }
  }, [actionData?.result.status])

  return (
    <main>
      <Grid className="pb-16 pt-8 lg:pb-56 lg:pt-14">
        <div className="col-span-full mb-4 lg:mb-16">
          <Breadcrumbs />
        </div>
        <div className="col-span-full lg:col-span-5">
          <H5 as="h1" variant="secondary" className="mb-4 lg:mb-6">
            {t('apply.title')}
          </H5>
          <H3 as="h2">{t('apply.text')}</H3>
        </div>
        <div className="col-span-full py-10 lg:col-span-7 lg:px-8 lg:py-3">
          {actionData?.result.status === 'success' ? (
            <div className="min-h-[60vh]">
              <H3 as="span">{t('form.apply.success')}</H3>
            </div>
          ) : (
            <Form method="POST" {...getFormProps(form)}>
              <AuthenticityTokenInput />
              <HoneypotInputs />
              <input
                type="hidden"
                name="vacancies"
                value={JSON.stringify(vacancies)}
              />
              <Field
                {...getInputProps(fields.name, { type: 'text' })}
                label={t('form.name.label')}
                placeholder={t('form.name.placeholder')}
                autoComplete="name"
                autoFocus
                errors={fields.name.errors}
              />
              <Field
                {...getInputProps(fields.email, { type: 'email' })}
                label={t('form.email.label')}
                placeholder={t('form.email.placeholder')}
                type="email"
                autoComplete="email"
                errors={fields.email.errors}
              />
              <Field
                {...getInputProps(fields.phone, { type: 'tel' })}
                label={t('form.phone.label')}
                placeholder={t('form.phone.placeholder')}
                type="tel"
                autoComplete="tel"
                errors={fields.phone.errors}
              />
              <Select
                {...getSelectProps(fields.employment)}
                className="text-primary"
                label={t('form.employment.label')}
                errors={fields.employment.errors}
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
                {...getSelectProps(fields.citizenship)}
                label={t('form.citizenship.label')}
                errors={fields.citizenship.errors}
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
                {...getSelectProps(fields.role)}
                label={t('form.role.label')}
                errors={fields.role.errors}
              >
                {vacancies.map(vacancy => (
                  <option key={vacancy.uuid} value={vacancy.name}>
                    {vacancy.name}
                  </option>
                ))}
              </Select>
              <Field
                {...getInputProps(fields.linkedin, { type: 'url' })}
                label={t('form.linkedin.label')}
                placeholder={t('form.linkedin.placeholder')}
                errors={fields.linkedin.errors}
              />
              <Field
                {...getTextareaProps(fields.motivation)}
                label={t('form.motivation.label')}
                placeholder={t('form.motivation.placeholder')}
                type="textarea"
                rows={10}
                errors={fields.motivation.errors}
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
    </main>
  )
}
