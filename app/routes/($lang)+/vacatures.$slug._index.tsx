import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { StoryblokComponent, useStoryblokState } from '@storyblok/react'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import { createBreadcrumbs } from '#app/components/breadcrumbs'
import { GeneralErrorBoundary, NotFoundError } from '#app/components/errors.tsx'
import { getAllVacancies, getVacancyBySlug } from '#app/lib/storyblok.server.ts'
import { type RootLoaderType } from '#app/root.tsx'
import { type Handle } from '#app/types.ts'
import {
  defaultLanguage,
  getLanguageFromContext,
  getLanguageFromPath,
  getStaticLabel,
} from '#app/utils/i18n.ts'
import {
  getJsonLdBreadcrumbs,
  getJsonLdJobPosting,
  getJsonLdLogo,
} from '#app/utils/json-ld.ts'
import { createAlternateLinks, getUrl } from '#app/utils/misc.tsx'
import { getSocialMetas } from '#app/utils/seo.ts'
import {
  getTranslatedSlugsFromStory,
  isPreview,
} from '#app/utils/storyblok.tsx'

export const handle: Handle = {
  getSitemapEntries: async request => {
    const { pathname } = new URL(request.url)
    const language = getLanguageFromPath(pathname)
    const pages = await getAllVacancies(language)
    return (pages || []).map(page => ({
      route: `/${page.full_slug}`,
      priority: 0.7,
    }))
  },
}

export async function loader({ params, request, context }: LoaderFunctionArgs) {
  if (!params.slug) {
    throw new Error('Slug is not defined!')
  }

  const preview = isPreview(request)
  const language = getLanguageFromContext(context)
  const { pathname } = new URL(request.url)

  const story = await getVacancyBySlug(params.slug, language, preview)

  if (!story) {
    throw new Response('Not found', { status: 404 })
  }

  if (language !== defaultLanguage && pathname !== `/${story.full_slug}`) {
    throw redirect(`/${story.full_slug}`)
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
  location,
}) => {
  const rootData = matches.find(m => m.id === 'root')?.data
  const slugs = getTranslatedSlugsFromStory(data?.story)
  const altLinks = createAlternateLinks(slugs, rootData.requestInfo.origin)
  const date = new Date(data.story.first_published_at ?? '')
  const datePosted = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  const breadcrumbs = createBreadcrumbs(location.pathname, rootData.language)

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
      {
        'script:ld+json': getJsonLdBreadcrumbs({
          breadcrumbs,
          origin: rootData.requestInfo.origin,
        }),
      },
      {
        'script:ld+json': getJsonLdJobPosting({
          title: data.story?.name ?? '',
          description: data.story?.description ?? '',
          origin: rootData.requestInfo.origin,
          datePosted,
        }),
      },
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

export default function VacancyRoute() {
  const data = useTypedLoaderData<typeof loader>()
  const story = useStoryblokState(data.story)

  return (
    <main>
      <StoryblokComponent blok={story?.content} />
    </main>
  )
}

export function ErrorBoundary() {
  return <GeneralErrorBoundary statusHandlers={{ 404: NotFoundError }} />
}
