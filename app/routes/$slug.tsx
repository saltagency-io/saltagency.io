import * as React from 'react'

import type { DataFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useCatch } from '@remix-run/react'

import { StoryblokComponent, useStoryblokState } from '@storyblok/react'

import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import type { LoaderData as RootLoaderData } from '../root'
import { NotFoundError } from '~/components/errors'
import { getStoriesForSitemap, getStoryBySlug } from '~/lib/storyblok.server'
import { pathedRoutes } from '~/other-routes.server'
import type { Handle } from '~/types'
import { getUrl } from '~/utils/misc'
import { getSocialMetas } from '~/utils/seo'
import { isPreview } from '~/utils/storyblok'

export const handle: Handle = {
  getSitemapEntries: async () => {
    const pages = await getStoriesForSitemap()
    return pages.map((page) => ({
      route: `/${page.slug}`,
      priority: 0.4,
    }))
  },
}

export async function loader({ params, request }: DataFunctionArgs) {
  if (pathedRoutes[new URL(request.url).pathname]) {
    throw new Response('Use other route', { status: 404 })
  }

  const preview = isPreview(request)
  const initialStory = await getStoryBySlug(params.slug ?? 'home', preview)

  if (!initialStory) {
    throw json({}, { status: 404 })
  }

  const data = {
    initialStory,
    preview,
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
        image: meta?.og_image,
        url: getUrl(requestInfo),
      }),
    }
  } else {
    return {
      title: 'Not found',
      description: 'You landed on a page that we could not find 😢',
    }
  }
}

export default function Page() {
  const data = useTypedLoaderData<typeof loader>()
  const story = useStoryblokState(data.initialStory, {}, data.preview)

  return <StoryblokComponent blok={story.content} />
}

export function CatchBoundary() {
  const caught = useCatch()
  console.error('CatchBoundary', caught)
  return <NotFoundError />
}
