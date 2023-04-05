import * as React from 'react'

import type { DataFunctionArgs } from '@remix-run/node'
import { json, type MetaFunction, redirect } from '@remix-run/node'

import { StoryblokComponent, useStoryblokState } from '@storyblok/react'

import {
  typedjson,
  UseDataFunctionReturn,
  useTypedLoaderData,
} from 'remix-typedjson'

import { getAllVacancies, getVacancyBySlug } from '~/lib/storyblok.server'
import type { LoaderData as RootLoaderData } from '~/root'
import type { Handle } from '~/types'
import type { DynamicLinksFunction } from '~/utils/dynamic-links'
import {getLocaleFromContext, getStaticLabel} from '~/utils/i18n'
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
  getSitemapEntries: async (locale) => {
    const pages = await getAllVacancies(locale)
    return (pages || []).map((page) => ({
      route: `/${page.full_slug}`,
      priority: 0.7,
    }))
  },
  dynamicLinks,
}

export async function loader({ params, request, context }: DataFunctionArgs) {
  if (!params.slug) {
    throw new Error('Slug is not defined!')
  }

  const preview = isPreview(request)
  const locale = getLocaleFromContext(context)
  const { pathname } = new URL(request.url)

  const story = await getVacancyBySlug(params.slug, locale, preview)

  if (!story) {
    throw json({}, { status: 404 })
  }

  if (pathname !== `/${story.full_slug}`) {
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
  const { requestInfo, locale } = parentsData.root as RootLoaderData

  if (data?.story) {
    const meta = data.story.content.metatags
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
      title: getStaticLabel('404.meta.title', locale),
      description: getStaticLabel('404.meta.description', locale),
    }
  }
}

export default function VacancyPage() {
  const data = useTypedLoaderData()
  const story = useStoryblokState(data.story, {}, data.preview)

  return (
    <main>
      <StoryblokComponent
        blok={story.content}
        publishDate={story.first_published_at}
      />
    </main>
  )
}
