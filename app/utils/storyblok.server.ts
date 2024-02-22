import {
  getStoryblokApi,
  type ISbStoryData as StoryData,
} from '@storyblok/react'

import {
  type LayoutStoryContent,
  type PageStoryContent,
  type VacancyStoryContent,
} from '#app/types.ts'
import i18n from '#app/utils/i18n.ts'

function getDefaultParams({
  preview,
  language,
}: {
  preview: boolean
  language?: string
}) {
  return {
    version: preview ? ('draft' as const) : ('published' as const),
    resolve_links: 'url' as const,
    language: language ?? i18n.fallbackLng,
  }
}

export async function getStoryBySlug(
  slug: string,
  language: string,
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
  language: string,
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
  language: string,
  preview = false,
): Promise<StoryData<VacancyStoryContent>[] | undefined> {
  const params = {
    ...getDefaultParams({ preview, language }),
    starts_with: 'vacatures/',
    is_startpage: false,
  }

  try {
    return getStoryblokApi().getAll(`cdn/stories`, params)
  } catch (error) {
    console.error(`Failed to fetch all vacancies`, error)
  }
}

export async function getLayout(
  language: string,
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

export async function getStoriesForSitemap(language: string) {
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
