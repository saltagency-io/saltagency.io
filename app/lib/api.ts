import type { StoryData } from '@storyblok/react'
import { getStoryblokApi } from '@storyblok/react'

export async function getStoryBySlug(
  slug: string,
  preview = false,
): Promise<StoryData> {
  const params = {
    version: preview ? 'draft' : 'published',
  }
  const { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, params)
  return data?.story
}
