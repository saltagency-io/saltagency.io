import * as React from 'react'

import type { DataFunctionArgs, MetaFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
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
import {
  defaultLanguage,
  getLanguageFromContext,
  getStaticLabel,
  isSupportedLanguage,
  supportedLanguages,
} from '~/utils/i18n'
import { createAlternateLinks, getUrl } from '~/utils/misc'
import { getSocialMetas } from '~/utils/seo'
import { getTranslatedSlugsFromStory, isPreview } from '~/utils/storyblok'

const dynamicLinks: DynamicLinksFunction<
  UseDataFunctionReturn<typeof loader>
> = ({ data, parentsData }) => {
  const requestInfo = parentsData[0].requestInfo
  const slugs = getTranslatedSlugsFromStory(data?.story)
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

  // Include whatever is in params.lang if it is not a supported langauge.
  // This way we support arbitrary nested routes.
  const slugStart =
    params.slug && !isSupportedLanguage(params.lang) ? `${params.lang}/` : ''
  const slugOrHome =
    !params.slug && params.lang === language
      ? 'home'
      : params.slug ?? params.lang ?? 'home'
  const slug = `${slugStart}${slugOrHome}`

  const story = await getStoryBySlug(slug, language, preview)

  if (!story) {
    throw json({}, { status: 404 })
  }

  // Home page has slug "home" but we don't want that url to work
  if (pathname.includes('home')) {
    throw redirect(language === defaultLanguage ? '/' : `/${language}`)
  }

  // Make sure a translated story cannot be requested using the default slug (e.g. /nl/about)
  if (
    story.slug !== 'home' &&
    language !== defaultLanguage &&
    pathname !== `/${story.full_slug}`
  ) {
    throw redirect(`/${story.full_slug}`)
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
  const { requestInfo, language } = parentsData.root as RootLoaderData

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
      title: getStaticLabel('404.meta.title', language),
      description: getStaticLabel('404.meta.description', language),
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
