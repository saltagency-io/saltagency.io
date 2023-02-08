import * as React from 'react'

import type { DataFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'

import { StoryblokComponent, useStoryblokState } from '@storyblok/react'

import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import { getVacancyBySlug } from '~/lib/api'
import { isPreview } from '~/utils/storyblok'

export async function loader({ params, request }: DataFunctionArgs) {
  if (!params.slug) {
    throw new Error('Slug is not defined!')
  }
  const preview = isPreview(request)
  const initialStory = await getVacancyBySlug(params.slug, preview)

  if (!initialStory) {
    throw json({}, { status: 404 })
  }

  const data = {
    initialStory,
    preview,
  }

  const headers = {
    'Cache-Control': 'private, max-age=3600',
  }

  return typedjson(data, { status: 200, headers })
}

export default function VacancyPage() {
  const data = useTypedLoaderData()
  const story = useStoryblokState(data.initialStory, {}, data.preview)

  return <StoryblokComponent blok={story.content} />
}
