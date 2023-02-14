import type {
  DataFunctionArgs,
  MetaFunction,
  SerializeFrom,
} from '@remix-run/node'
import { json } from '@remix-run/node'

import { StoryblokComponent, useStoryblokState } from '@storyblok/react'

import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import type { LoaderData as RootLoaderData } from '../root'
import { getStoriesForSitemap, getStoryBySlug } from '~/lib/api'
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

export default function Page() {
  const data = useTypedLoaderData<typeof loader>()
  const story = useStoryblokState(data.initialStory, {}, data.preview)

  return <StoryblokComponent blok={story.content} />
}
