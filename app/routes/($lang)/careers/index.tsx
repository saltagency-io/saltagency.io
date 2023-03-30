import React from 'react'

import { DataFunctionArgs, json, MetaFunction } from '@remix-run/node'

import { StoryblokComponent, useStoryblokState } from '@storyblok/react'

import type { UseDataFunctionReturn } from 'remix-typedjson'
import {typedjson, useTypedLoaderData} from 'remix-typedjson'

import { getStoryBySlug } from '~/lib/storyblok.server'
import type { LoaderData as RootLoaderData } from '~/root'
import type { Handle } from '~/types'
import type { DynamicLinksFunction } from '~/utils/dynamic-links'
import {
  defaultLanguage,
  getLanguageFromContext,
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
  const slugs = getTranslatedSlugsFromStory(data.story)
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
  const { requestInfo } = parentsData.root as RootLoaderData

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
      title: 'Not found',
      description: 'You landed on a page that we could not find 😢',
    }
  }
}

export async function loader({ request, context }: DataFunctionArgs) {
  const preview = isPreview(request)
  const language = getLanguageFromContext(context)
  const story = await getStoryBySlug('careers/', language, preview)

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

export default function CareersHome() {
  const data = useTypedLoaderData<typeof loader>()
  const story = useStoryblokState(data.story, {}, data.preview)

  return (
    <main>
      <StoryblokComponent blok={story.content} />
    </main>
  )
}
