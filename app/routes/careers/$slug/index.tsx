import * as React from 'react'

import type { DataFunctionArgs } from '@remix-run/node'
import { json, type MetaFunction } from '@remix-run/node'
import { useCatch } from '@remix-run/react'

import { StoryblokComponent, useStoryblokState } from '@storyblok/react'

import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import { NotFoundError } from '~/components/errors'
import { getAllVacancies, getVacancyBySlug } from '~/lib/storyblok.server'
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

  const { origin } = new URL(request.url)

  const data = {
    initialStory,
    preview,
    origin,
  }

  return typedjson(data, {
    status: 200,
    headers: {
      'Cache-Control': 'private, max-age=3600',
    },
  })
}

export const meta: MetaFunction = ({ data, parentsData }) => {
  const { requestInfo } = parentsData.root as RootLoaderData

  if (data?.initialStory) {
    const meta = data.initialStory.content.metatags
    return {
      ...getSocialMetas({
        title: meta?.title,
        description: meta?.description,
        url: getUrl(requestInfo),
        image: meta?.og_image,
      }),
    }
  } else {
    return {
      title: 'Not found',
      description: 'You landed on a career page that we could not find 😢',
    }
  }
}

export default function VacancyPage() {
  const data = useTypedLoaderData()
  const story = useStoryblokState(data.initialStory, {}, data.preview)

  return <StoryblokComponent blok={story.content} slug={story.slug} />
}

export function CatchBoundary() {
  const caught = useCatch()
  console.error('CatchBoundary', caught)
  return <NotFoundError />
}
