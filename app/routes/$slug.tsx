import type {
  DataFunctionArgs,
  MetaFunction,
  SerializeFrom,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import type { SbBlokData } from '@storyblok/react'
import { StoryblokComponent, useStoryblokState } from '@storyblok/react'

import type { LoaderData as RootLoaderData } from '../root'
import { getStoryBySlug } from '~/lib/api'
import { getUrl } from '~/utils/misc'
import { getSocialMetas } from '~/utils/seo'
import { isPreview } from '~/utils/storyblok'

export async function loader({ params, request }: DataFunctionArgs) {
  const preview = isPreview(request)
  const initialStory = await getStoryBySlug(params.slug ?? 'home', preview)

  return json({
    initialStory,
    preview,
  })
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
  const { initialStory, preview } = useLoaderData()
  const story = useStoryblokState<SbBlokData>(initialStory, {}, preview)

  return <StoryblokComponent blok={story.content} />
}
