import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { StoryblokComponent, useStoryblokState } from '@storyblok/react'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import { type RootLoaderType } from '#app/root.tsx'
import { type Handle } from '#app/types.ts'
import { defaultLanguage, getLocaleFromRequest } from '#app/utils/i18n.ts'
import { getJsonLdLogo } from '#app/utils/json-ld.ts'
import { createAlternateLinks, getUrl } from '#app/utils/misc.tsx'
import { getSocialMetas } from '#app/utils/seo.ts'
import { getStoryBySlug } from '#app/utils/storyblok-api'
import {
  getTranslatedSlugsFromStory,
  isPreview,
} from '#app/utils/storyblok.tsx'

export const routes: Record<string, string> = {
  en: 'stories',
  nl: 'stories',
}

export const handle: Handle = {
  getSitemapEntries: request => {
    const locale = getLocaleFromRequest(request)

    return [
      {
        route: `${locale === defaultLanguage ? '' : `/${locale}`}/${
          routes[locale]
        }`,
        priority: 0.5,
      },
    ]
  },
}

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = getLocaleFromRequest(request)
  const preview = isPreview(request)
  const { pathname } = new URL(request.url)

  const story = await getStoryBySlug('stories/', locale, preview)

  if (!story) {
    throw new Response('Not found', { status: 404 })
  }

  if (locale !== defaultLanguage && `${pathname}/` !== `/${story.full_slug}`) {
    throw redirect(
      `/${story.full_slug.substring(0, story.full_slug.length - 1)}`,
    )
  }

  return typedjson(
    {
      story,
      preview,
    },
    {
      headers: {
        'Cache-Control': 'private, max-age=900', // 15 min.
      },
    },
  )
}

export const meta: MetaFunction<typeof loader, { root: RootLoaderType }> = ({
  data,
  matches,
}) => {
  const rootData = matches.find(m => m.id === 'root')?.data
  const slugs = getTranslatedSlugsFromStory(data?.story)
  const altLinks = createAlternateLinks(slugs, rootData.requestInfo.origin)

  if (data?.story) {
    const meta = data.story.content.metatags
    return [
      ...getSocialMetas({
        title: meta?.title,
        description: meta?.description,
        image: meta?.og_image,
        url: getUrl(rootData.requestInfo),
      }),
      ...altLinks,
      { 'script:ld+json': getJsonLdLogo(rootData.requestInfo.origin) },
    ]
  } else {
    return [
      { title: rootData.errorLabels.title },
      {
        name: 'description',
        content: rootData.errorLabels.title,
      },
    ]
  }
}

export default function StoriesRoute() {
  const data = useTypedLoaderData<typeof loader>()
  const story = useStoryblokState(data.story)

  return (
    <main>
      <StoryblokComponent blok={story?.content} />
    </main>
  )
}
