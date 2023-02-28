import type { StoryData } from '@storyblok/react'
import { getStoryblokApi } from '@storyblok/react'

import type {
  DataSourceEntry,
  LayoutStoryContent,
  PageStoryContent,
  VacancyStoryContent,
} from '~/types'

function getDefaultParams({ preview }: { preview: boolean }) {
  return {
    version: preview ? 'draft' : 'published',
  }
}

export async function getDataSource(
  name: string,
): Promise<DataSourceEntry[] | undefined> {
  try {
    const { data } = await getStoryblokApi().get(
      `cdn/datasource_entries?datasource=${name}`,
      {
        per_page: 200,
      },
    )
    return data.datasource_entries
  } catch (error) {
    console.error(`Failed to fetch data source with name: ${name}`, error)
  }
}

export async function getStoryBySlug(
  slug: string,
  preview = false,
): Promise<StoryData<PageStoryContent> | undefined> {
  const params = getDefaultParams({ preview })

  try {
    const { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, params)
    return data?.story
  } catch (error) {
    console.error(`Failed to fetch story for slug ${slug}`, error)
  }
}

export async function getVacancyBySlug(
  slug: string,
  preview = false,
): Promise<StoryData<VacancyStoryContent> | undefined> {
  const params = getDefaultParams({ preview })

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
  preview = false,
): Promise<StoryData<VacancyStoryContent>[] | undefined> {
  const params = { ...getDefaultParams({ preview }), starts_with: 'careers/' }

  try {
    return getStoryblokApi().getAll(`cdn/stories`, params)
  } catch (error) {
    console.error(`Failed to fetch all vacancies`, error)
  }
}

export async function getLayout(
  preview = false,
): Promise<StoryData<LayoutStoryContent> | undefined> {
  const params = getDefaultParams({ preview })

  try {
    const { data } = await getStoryblokApi().get(`cdn/stories/layout`, params)
    return data?.story
  } catch (error) {
    console.error(`Failed to fetch story for layout`, error)
  }
}

const sitemapBlackList = ['home', 'layout', 'contact', 'jobs/*']

export async function getStoriesForSitemap() {
  const params = {
    per_page: 100,
    excluding_slugs: sitemapBlackList.join(','),
  }

  try {
    return getStoryblokApi().getAll(`cdn/stories`, params)
  } catch (error) {
    console.error(`Failed to fetch all stories`, error)
    return []
  }
}
