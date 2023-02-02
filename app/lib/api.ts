import type { StoryData } from '@storyblok/react'
import { getStoryblokApi } from '@storyblok/react'

import type { StoryContent } from '~/types'

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
