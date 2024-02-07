import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { StoryblokComponent, useStoryblokState } from '@storyblok/react'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import { getStoryBySlug } from '#app/lib/storyblok.server.ts'
import { type RootLoaderType } from '#app/root.tsx'
import { type Handle } from '#app/types.ts'
import {
  defaultLanguage,
  getLanguageFromContext,
  getLanguageFromPath,
  getStaticLabel,
  type SupportedLanguage,
} from '#app/utils/i18n.ts'
import { getJsonLdLogo } from '#app/utils/json-ld.ts'
import { createAlternateLinks, getUrl } from '#app/utils/misc.tsx'
import { getSocialMetas } from '#app/utils/seo.ts'
import {
  getTranslatedSlugsFromStory,
  isPreview,
} from '#app/utils/storyblok.tsx'

export const routes: Record<SupportedLanguage, string> = {
  en: 'careers',
  nl: 'vacatures',
}

export const handle: Handle = {
  getSitemapEntries: request => {
    const { pathname } = new URL(request.url)
    const language = getLanguageFromPath(pathname)
    return [
      {
        route: `${language === defaultLanguage ? '' : `/${language}`}/${
          routes[language]
        }`,
        priority: 0.5,
      },
    ]
  },
}

export async function loader({ request, context }: LoaderFunctionArgs) {
  const preview = isPreview(request)
  const language = getLanguageFromContext(context)
  const { pathname } = new URL(request.url)

  const story = await getStoryBySlug('vacatures/', language, preview)

  if (!story) {
    throw new Response('Not found', { status: 404 })
  }

  if (
    language !== defaultLanguage &&
    `${pathname}/` !== `/${story.full_slug}`
  ) {
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
        'Cache-Control': 'private, max-age=3600',
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
      { title: getStaticLabel('404.meta.title', rootData.language) },
      {
        name: 'description',
        content: getStaticLabel('404.meta.description', rootData.language),
      },
    ]
  }
}

export default function VacanciesRoute() {
  const data = useTypedLoaderData<typeof loader>()
  const story = useStoryblokState(data.story)

  return (
    <main>
      <StoryblokComponent blok={story?.content} />
    </main>
  )
}
