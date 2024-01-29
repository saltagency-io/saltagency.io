import { getStoryblokApi, type StoryData } from '@storyblok/react'

import type {
	DataSourceEntry,
	LayoutStoryContent,
	PageStoryContent,
	VacancyStoryContent,
} from '#app/types.ts'
import { defaultLanguage, type SupportedLanguage } from '#app/utils/i18n.ts'

function getDefaultParams({
	preview,
	language,
}: {
	preview: boolean
	language?: SupportedLanguage
}) {
	return {
		version: preview ? 'draft' : 'published',
		resolve_links: 'url',
		language: language ?? defaultLanguage,
	}
}

export async function getDataSource(
	name: string,
	language = defaultLanguage,
): Promise<DataSourceEntry[] | undefined> {
	try {
		const { data } = await getStoryblokApi().get(`cdn/datasource_entries`, {
			datasource: name,
			dimension: language,
			per_page: 200,
		})
		return data.datasource_entries
	} catch (error) {
		console.error(`Failed to fetch data source with name: ${name}`, error)
	}
}

export async function getStoryBySlug(
	slug: string,
	language: SupportedLanguage,
	preview = false,
): Promise<StoryData<PageStoryContent> | undefined> {
	const params = getDefaultParams({ preview, language })

	try {
		const { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, params)
		return data?.story
	} catch (error) {
		console.error(`Failed to fetch story for slug ${slug}`, error)
	}
}

export async function getVacancyBySlug(
	slug: string,
	language = defaultLanguage,
	preview = false,
): Promise<StoryData<VacancyStoryContent> | undefined> {
	const params = getDefaultParams({ preview, language })

	try {
		const { data } = await getStoryblokApi().get(
			`cdn/stories/vacatures/${slug}`,
			params,
		)
		return data?.story
	} catch (error) {
		console.error(`Failed to fetch vacancy for slug: ${slug}`, error)
	}
}

export async function getAllVacancies(
	language: SupportedLanguage = defaultLanguage,
	preview = false,
): Promise<StoryData<VacancyStoryContent>[] | undefined> {
	const params = {
		...getDefaultParams({ preview, language }),
		starts_with: 'vacatures/',
		is_startpage: 0,
	}

	try {
		return getStoryblokApi().getAll(`cdn/stories`, params)
	} catch (error) {
		console.error(`Failed to fetch all vacancies`, error)
	}
}

export async function getLayout(
	language: SupportedLanguage,
	preview = false,
): Promise<StoryData<LayoutStoryContent> | undefined> {
	const params = getDefaultParams({ preview, language })

	try {
		const { data } = await getStoryblokApi().get(`cdn/stories/layout`, params)
		return data?.story
	} catch (error) {
		console.error(`Failed to fetch story for layout`, error)
	}
}

const sitemapBlackList = ['layout', 'contact', 'careers/*']

export async function getStoriesForSitemap(language: SupportedLanguage) {
	const params = {
		per_page: 100,
		excluding_slugs: sitemapBlackList.join(','),
		language,
	}

	try {
		return getStoryblokApi().getAll(`cdn/stories`, params)
	} catch (error) {
		console.error(`Failed to fetch all stories`, error)
		return []
	}
}
