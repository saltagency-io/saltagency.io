import * as React from 'react'

import type { DataFunctionArgs } from '@remix-run/node'
import { json, type MetaFunction, type SerializeFrom } from '@remix-run/node'

import { StoryblokComponent, useStoryblokState } from '@storyblok/react'

import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import { getAllVacancies, getVacancyBySlug } from '~/lib/api'
import type { LoaderData as RootLoaderData } from '~/root'
import type { Handle } from '~/types'
import { getUrl } from '~/utils/misc'
import { getSocialMetas } from '~/utils/seo'
import { isPreview } from '~/utils/storyblok'

export const handle: Handle = {
  getSitemapEntries: async () => {
    const pages = await getAllVacancies(false)
    return (pages || []).map((page) => ({
      route: `/${page.full_slug}`,
      priority: 0.7,
    }))
  },
}

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

export const meta: MetaFunction = ({ data, parentsData }) => {
  const { requestInfo } = parentsData.root as RootLoaderData
  const { initialStory } = data as SerializeFrom<typeof loader>
  const meta = initialStory.content.metatags

  if (!meta) {
    return {}
  }

  return {
    ...getSocialMetas({
      title: meta.title,
      description: meta.description,
      url: getUrl(requestInfo),
      image: meta.og_image,
    }),
  }
}

export default function VacancyPage() {
  const data = useTypedLoaderData()
  const story = useStoryblokState(data.initialStory, {}, data.preview)

  return <StoryblokComponent blok={story.content} />
}
