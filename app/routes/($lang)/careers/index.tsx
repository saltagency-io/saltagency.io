import * as React from 'react'

import type { MetaFunction } from '@remix-run/node'
import type { HeadersFunction } from '@remix-run/node'
import { DataFunctionArgs, json } from '@remix-run/node'

import { StoryblokComponent, useStoryblokState } from '@storyblok/react'

import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import { getStoryBySlug } from '~/lib/storyblok.server'
import type { LoaderData as RootLoaderData } from '~/root'
import { useI18n } from '~/utils/i18n-provider'
import { getUrl } from '~/utils/misc'
import { getSocialMetas } from '~/utils/seo'
import { isPreview } from '~/utils/storyblok'

export async function loader({ request }: DataFunctionArgs) {
  const preview = isPreview(request)
  const initialStory = await getStoryBySlug('careers/', preview)

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

export const meta: MetaFunction = ({ parentsData }) => {
  const { requestInfo } = parentsData.root as RootLoaderData
  return {
    ...getSocialMetas({
      title: 'Careers | Salt',
      description: 'Open positions at Salt. Come and join us!',
      url: getUrl(requestInfo),
    }),
  }
}

export const headers: HeadersFunction = () => ({
  'Cache-Control': 'private, max-age=3600',
})

export default function CareersIndex() {
  const data = useTypedLoaderData<typeof loader>()
  const story = useStoryblokState(data.initialStory, {}, data.preview)

  return (
    <main>
      <StoryblokComponent blok={story.content} />
    </main>
  )
}
