import * as React from 'react'

import {
	json,
	redirect,
	type ActionFunction,
	type LoaderFunctionArgs,
	type MetaFunction,
} from '@remix-run/node'
import { useFetcher, useSearchParams } from '@remix-run/react'
import { typedjson, type UseDataFunctionReturn } from 'remix-typedjson'

import { Breadcrumbs } from '#app/components/breadcrumbs.tsx'
import { Button } from '#app/components/button.tsx'
import { ErrorPanel, Field, Select } from '#app/components/form-elements.tsx'
import { Grid } from '#app/components/grid.tsx'
import { H1, H3, H4 } from '#app/components/typography.tsx'
import { sendApplicationToNotion } from '#app/lib/notion.server.ts'
import { getAllVacancies, getVacancyBySlug } from '#app/lib/storyblok.server.ts'
import type { LoaderData as RootLoaderData } from '#app/root.tsx'
import type { Handle } from '#app/types.ts'
import { handleFormSubmission } from '#app/utils/actions.server.ts'
import type { DynamicLinksFunction } from '#app/utils/dynamic-links.tsx'
import {
	defaultLanguage,
	getLanguageFromContext,
	SupportedLanguage,
} from '#app/utils/i18n.tsx'
import { useLabels } from '#app/utils/labels-provider.tsx'
import {
	createAlternateLinks,
	getLabelKeyForError,
	getUrl,
} from '#app/utils/misc.tsx'
import { useVacancies } from '#app/utils/providers.tsx'
import { getSocialMetas } from '#app/utils/seo.ts'
import { getTranslatedSlugsFromStory, isPreview } from '#app/utils/storyblok.ts'
import {
	isValidBody,
	isValidEmail,
	isValidName,
	isValidPhoneNumber,
	isValidString,
	isValidUrl,
} from '#app/utils/validators.ts'

export const routes: Record<SupportedLanguage, string> = {
	en: 'apply',
	nl: 'solliciteren',
}

const dynamicLinks: DynamicLinksFunction<
	UseDataFunctionReturn<typeof loader>
> = ({ data, parentsData }) => {
	const requestInfo = parentsData[0].requestInfo
	const slugs = getTranslatedSlugsFromStory(data?.story)
	return createAlternateLinks(slugs, requestInfo.origin)
}

export const handle: Handle = {
	getSitemapEntries: async language => {
		const pages = await getAllVacancies(language)
		return (pages || []).map(page => ({
			route: `/${page.full_slug}/${routes[language]}`,
			priority: 0.6,
		}))
	},
	dynamicLinks,
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
		throw json({}, { status: 404 })
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

export const meta: MetaFunction = ({ parentsData, location }) => {
	const { requestInfo, language } = parentsData.root as RootLoaderData
	const params = new URLSearchParams(location.search)
	const role = params.get('role') ?? ''

	return {
		...getSocialMetas({
			title: translatedTitle(role, language),
			description: translatedDescription(role, language),
			url: getUrl(requestInfo),
		}),
	}
}

type Fields = {
	name?: string | null
	email?: string | null
	phone?: string | null
	employment?: string | null
	citizenship?: string | null
	role?: string | null
	linkedin?: string | null
	motivation?: string | null
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
			employment: getLabelKeyForError(isValidString, 'form.employment.error'),
			citizenship: getLabelKeyForError(isValidString, 'form.citizenship.error'),
			role: getLabelKeyForError(isValidString, 'form.role.error'),
			linkedin: getLabelKeyForError(isValidUrl, 'form.linkedin.error'),
			motivation: getLabelKeyForError(isValidBody, 'form.motivation.error'),
		},
		handleFormValues: async fields => {
			await sendApplicationToNotion(fields)

			const actionData: ActionData = { fields, status: 'success', errors: {} }
			return json(actionData)
		},
	})
}

export default function ApplyRoute() {
	const applyFetcher = useFetcher<ActionData>()
	const [searchParams] = useSearchParams()
	const { t, to } = useLabels()
	const { vacancies } = useVacancies()

	const messageSuccessfullySent =
		applyFetcher.type === 'done' && applyFetcher.data.status === 'success'

	React.useEffect(() => {
		if (window.fathom && messageSuccessfullySent) {
			window.fathom.trackGoal('51XZFYES', 0)
		}
	}, [messageSuccessfullySent])

	return (
		<main>
			<Grid className="pb-16 pt-8 lg:pb-56 lg:pt-14">
				<div className="col-span-full mb-4 lg:mb-8">
					<Breadcrumbs />
				</div>
				<div className="col-span-full lg:col-span-5">
					<H1 className="mb-4 lg:mb-8">{t('apply.title')}</H1>
					<H4 as="h2" variant="secondary">
						{t('apply.text')}
					</H4>
				</div>
				<div className="col-span-full py-10 lg:col-span-7 lg:px-8 lg:py-3">
					{messageSuccessfullySent ? (
						<div className="min-h-[60vh]">
							<H3 as="span">{t('form.apply.success')}</H3>
						</div>
					) : (
						<applyFetcher.Form
							method="post"
							aria-describedby="apply-form-error"
						>
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
								{vacancies.map(vacancy => (
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
