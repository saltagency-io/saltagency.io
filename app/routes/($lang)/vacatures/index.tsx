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
  defaultLanguage,
  getLanguageFromContext,
  getStaticLabel,
  SupportedLanguage,
} from '~/utils/i18n'
import { createAlternateLinks, getUrl } from '~/utils/misc'
import { getSocialMetas } from '~/utils/seo'
import { getTranslatedSlugsFromStory, isPreview } from '~/utils/storyblok'

export const routes: Record<SupportedLanguage, string> = {
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
  getSitemapEntries: (language) => {
    return [
      {
        route: `${language === defaultLanguage ? '' : `/${language}`}/${
          routes[language]
        }`,
        priority: 0.5,
      },
    ]
  },
  dynamicLinks,
}

export const meta: MetaFunction = ({ data, parentsData }) => {
  const { requestInfo, language } = parentsData.root as RootLoaderData

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
      title: getStaticLabel('404.meta.title', language),
      description: getStaticLabel('404.meta.description', language),
    }
  }
}

export async function loader({ request, context }: DataFunctionArgs) {
  const preview = isPreview(request)
  const language = getLanguageFromContext(context)
  const { pathname } = new URL(request.url)

  const story = await getStoryBySlug('vacatures/', language, preview)

  if (!story) {
    throw json({}, { status: 404 })
  }

  if (
    language !== defaultLanguage &&
    `${pathname}/` !== `/${story.full_slug}`
  ) {
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
