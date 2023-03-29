import * as React from 'react'

import type { DataFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useCatch } from '@remix-run/react'

import { StoryblokComponent, useStoryblokState } from '@storyblok/react'

import {
  typedjson,
  UseDataFunctionReturn,
  useTypedLoaderData,
} from 'remix-typedjson'

import type { LoaderData as RootLoaderData } from '../../root'
import { NotFoundError } from '~/components/errors'
import { getStoriesForSitemap, getStoryBySlug } from '~/lib/storyblok.server'
import { pathedRoutes } from '~/other-routes.server'
import type { Handle } from '~/types'
import type { DynamicLinksFunction } from '~/utils/dynamic-links'
import { defaultLanguage, getLanguageFromContext } from '~/utils/i18n'
import { createAlternateLinks, getUrl } from '~/utils/misc'
import { getSocialMetas } from '~/utils/seo'
import { getTranslatedSlugsFromStory, isPreview } from '~/utils/storyblok'

const dynamicLinks: DynamicLinksFunction<
  UseDataFunctionReturn<typeof loader>
> = ({ data, parentsData }) => {
  const requestInfo = parentsData[0].requestInfo
  const slugs = getTranslatedSlugsFromStory(data.story)
  return createAlternateLinks(slugs, requestInfo.origin)
}

export const handle: Handle = {
  getSitemapEntries: async (language) => {
    const pages = await getStoriesForSitemap(language)
    return pages.map((page) => ({
      route: `${
        page.slug === 'home'
          ? `${language === defaultLanguage ? '' : `/${language}`}`
          : `/${page.full_slug}`
      }`,
      priority: 0.4,
    }))
  },
  dynamicLinks,
}

export async function loader({ params, request, context }: DataFunctionArgs) {
  const preview = isPreview(request)
  const language = getLanguageFromContext(context)
  const { pathname } = new URL(request.url)

  // Block the layout path when not in preview mode
  if (pathedRoutes[pathname] || (!preview && pathname === '/layout')) {
    throw new Response('Use other route', { status: 404 })
  }

  const slug =
    !params.slug && params.lang === language
      ? 'home'
      : params.slug ?? params.lang ?? 'home'

  const story = await getStoryBySlug(slug, language, preview)

  if (!story) {
    throw json({}, { status: 404 })
  }

  const data = {
    story,
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

  if (data?.story) {
    const meta = data.story.content.metatags
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
  const story = useStoryblokState(data.story, {}, data.preview)

  return (
    <main>
      <StoryblokComponent blok={story.content} />
    </main>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  console.error('CatchBoundary', caught)
  return <NotFoundError />
}
