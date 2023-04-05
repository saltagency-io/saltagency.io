import React from 'react'

import { DataFunctionArgs, json, MetaFunction, redirect } from '@remix-run/node'

import { StoryblokComponent, useStoryblokState } from '@storyblok/react'

import type { UseDataFunctionReturn } from 'remix-typedjson'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import { getStoryBySlug } from '~/lib/storyblok.server'
import type { LoaderData as RootLoaderData } from '~/root'
import type { Handle } from '~/types'
import type { DynamicLinksFunction } from '~/utils/dynamic-links'
import {
  defaultLocale,
  getLocaleFromContext,
  getStaticLabel,
  SupportedLocale,
} from '~/utils/i18n'
import { createAlternateLinks, getUrl } from '~/utils/misc'
import { getSocialMetas } from '~/utils/seo'
import { getTranslatedSlugsFromStory, isPreview } from '~/utils/storyblok'

export const routes: Record<SupportedLocale, string> = {
  en: 'careers',
  nl: 'vacatures',
}

const dynamicLinks: DynamicLinksFunction<
  UseDataFunctionReturn<typeof loader>
> = ({ data, parentsData }) => {
  const requestInfo = parentsData[0].requestInfo
  const slugs = getTranslatedSlugsFromStory(data?.story)
  return createAlternateLinks(slugs, requestInfo.origin)
}

export const handle: Handle = {
  getSitemapEntries: (locale) => {
    return [
      {
        route: `${locale === defaultLocale ? '' : `/${locale}`}/${
          routes[locale]
        }`,
        priority: 0.5,
      },
    ]
  },
  dynamicLinks,
}

export const meta: MetaFunction = ({ data, parentsData }) => {
  const { requestInfo, locale } = parentsData.root as RootLoaderData

  if (data.story) {
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
      title: getStaticLabel('404.meta.title', locale),
      description: getStaticLabel('404.meta.description', locale),
    }
  }
}

export async function loader({ request, context }: DataFunctionArgs) {
  const preview = isPreview(request)
  const locale = getLocaleFromContext(context)
  const { pathname } = new URL(request.url)

  const story = await getStoryBySlug('careers/', locale, preview)

  if (!story) {
    throw json({}, { status: 404 })
  }

  if (`${pathname}/` !== `/${story.full_slug}`) {
    throw redirect(
      `/${story.full_slug.substring(0, story.full_slug.length - 1)}`,
    )
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

export default function CareersHome() {
  const data = useTypedLoaderData<typeof loader>()
  const story = useStoryblokState(data.story, {}, data.preview)

  return (
    <main>
      <StoryblokComponent blok={story.content} />
    </main>
  )
}
