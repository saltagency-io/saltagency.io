import type { StoryData } from '@storyblok/react'
import { getStoryblokApi } from '@storyblok/react'

import type {
  DataSourceEntry,
  LayoutStoryContent,
  PageStoryContent,
  VacancyStoryContent,
} from '~/types'
import type { SupportedLocale } from '~/utils/i18n'
import { defaultLocale } from '~/utils/i18n'

function getDefaultParams({
  preview,
  locale,
}: {
  preview: boolean
  locale?: SupportedLocale
}) {
  return {
    version: preview ? 'draft' : 'published',
    resolve_links: 'url',
    language: locale ?? defaultLocale,
  }
}

export async function getDataSource(
  name: string,
  locale = defaultLocale,
): Promise<DataSourceEntry[] | undefined> {
  try {
    const { data } = await getStoryblokApi().get(`cdn/datasource_entries`, {
      datasource: name,
      dimension: locale,
      per_page: 200,
    })
    return data.datasource_entries
  } catch (error) {
    console.error(`Failed to fetch data source with name: ${name}`, error)
  }
}

export async function getStoryBySlug(
  slug: string,
  locale: SupportedLocale,
  preview = false,
): Promise<StoryData<PageStoryContent> | undefined> {
  const params = getDefaultParams({ preview, locale })

  try {
    const { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, params)
    return data?.story
  } catch (error) {
    console.error(`Failed to fetch story for slug ${slug}`, error)
  }
}

export async function getVacancyBySlug(
  slug: string,
  locale = defaultLocale,
  preview = false,
): Promise<StoryData<VacancyStoryContent> | undefined> {
  const params = getDefaultParams({ preview, locale })

  try {
    const { data } = await getStoryblokApi().get(
      `cdn/stories/careers/${slug}`,
      params,
    )
    return data?.story
  } catch (error) {
    console.error(`Failed to fetch vacancy for slug: ${slug}`, error)
  }
}

export async function getAllVacancies(
  locale: SupportedLocale = defaultLocale,
  preview = false,
): Promise<StoryData<VacancyStoryContent>[] | undefined> {
  const params = {
    ...getDefaultParams({ preview, locale }),
    starts_with: 'careers/',
    is_startpage: 0,
  }

  try {
    return getStoryblokApi().getAll(`cdn/stories`, params)
  } catch (error) {
    console.error(`Failed to fetch all vacancies`, error)
  }
}

export async function getLayout(
  locale: SupportedLocale,
  preview = false,
): Promise<StoryData<LayoutStoryContent> | undefined> {
  const params = getDefaultParams({ preview, locale })

  try {
    const { data } = await getStoryblokApi().get(`cdn/stories/layout`, params)
    return data?.story
  } catch (error) {
    console.error(`Failed to fetch story for layout`, error)
  }
}

const sitemapBlackList = ['layout', 'contact', 'careers/*']

export async function getStoriesForSitemap(locale: SupportedLocale) {
  const params = {
    per_page: 100,
    excluding_slugs: sitemapBlackList.join(','),
    language: locale,
  }

  try {
    return getStoryblokApi().getAll(`cdn/stories`, params)
  } catch (error) {
    console.error(`Failed to fetch all stories`, error)
    return []
  }
}
