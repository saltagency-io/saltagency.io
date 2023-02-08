import * as React from 'react'

import type { DataFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import {
  SbBlokData,
  StoryblokComponent,
  useStoryblokState,
} from '@storyblok/react'

import { getVacancyBySlug } from '~/lib/api'
import { isPreview } from '~/utils/storyblok'

export async function loader({ params, request }: DataFunctionArgs) {
  if (!params.slug) {
    throw new Error('Slug is not defined!')
  }
  const preview = isPreview(request)
  const initialStory = await getVacancyBySlug(params.slug)

  return json(
    {
      initialStory,
      preview,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'private, max-age=3600',
      },
    },
  )
}

export default function VacancyIndex() {
  const { initialStory, preview } = useLoaderData()
  const story = useStoryblokState<SbBlokData>(initialStory, {}, preview)

  return <StoryblokComponent blok={story.content} />
}
