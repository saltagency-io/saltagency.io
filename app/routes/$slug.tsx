import type { DataFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import type { SbBlokData } from '@storyblok/react'
import { StoryblokComponent, useStoryblokState } from '@storyblok/react'

import { getStoryBySlug } from '~/lib/api'
import { isPreview } from '~/utils/storyblok'

export async function loader({ params, request }: DataFunctionArgs) {
  const preview = isPreview(request)
  const initialStory = await getStoryBySlug(params.slug ?? 'home', preview)

  return json({
    initialStory,
    preview,
  })
}

export default function Page() {
  const { initialStory, preview } = useLoaderData()
  const story = useStoryblokState<SbBlokData>(initialStory, {}, preview)

  return <StoryblokComponent blok={story.content} />
}
