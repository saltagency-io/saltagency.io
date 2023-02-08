import type { StoryData } from '@storyblok/react'
import { getStoryblokApi } from '@storyblok/react'

import type { DataSourceEntry, StoryContent } from '~/types'

export async function getDataSource(name: string): Promise<DataSourceEntry[]> {
  const { data } = await getStoryblokApi().get(
    `cdn/datasource_entries?datasource=${name}`,
  )
  return data.datasource_entries
}

export async function getStoryBySlug(
  slug: string,
  preview = false,
): Promise<StoryData<StoryContent>> {
  const params = {
    version: preview ? 'draft' : 'published',
    language: 'default',
    fallback_lang: 'default',
  }
  const { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, params)
  return data?.story
}

export async function getVacancyBySlug(
  slug: string,
  preview = false,
): Promise<StoryData<StoryContent>> {
  const params = {
    version: preview ? 'draft' : 'published',
    language: 'default',
    fallback_lang: 'default',
  }
  const { data } = await getStoryblokApi().get(
    `cdn/stories/jobs/${slug}`,
    params,
  )
  return data?.story
}
