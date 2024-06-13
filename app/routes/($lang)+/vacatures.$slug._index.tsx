import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { StoryblokComponent, useStoryblokState } from '@storyblok/react'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import { createBreadcrumbs } from '#app/components/breadcrumbs'
import { GeneralErrorBoundary, NotFoundError } from '#app/components/errors.tsx'
import { type RootLoaderType } from '#app/root.tsx'
import { type Handle } from '#app/types.ts'
import { defaultLanguage, getLocaleFromRequest } from '#app/utils/i18n.ts'
import {
  getJsonLdBreadcrumbs,
  getJsonLdJobPosting,
  getJsonLdLogo,
} from '#app/utils/json-ld.ts'
import { createAlternateLinks, getUrl } from '#app/utils/misc.tsx'
import { getSocialMetas } from '#app/utils/seo.ts'
import { getAllVacancies, getVacancyBySlug } from '#app/utils/storyblok-api.ts'
import {
  getTranslatedSlugsFromStory,
  isPreview,
} from '#app/utils/storyblok.tsx'

export const handle: Handle = {
  getSitemapEntries: async request => {
    const locale = getLocaleFromRequest(request)
    const pages = await getAllVacancies(locale)
    return (pages || []).map(page => ({
      route: `/${page.full_slug}`,
      priority: 0.6,
    }))
  },
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  if (!params.slug) {
    throw new Error('Slug is not defined!')
  }

  const preview = isPreview(request)
  const locale = getLocaleFromRequest(request)
  const { pathname } = new URL(request.url)

  const story = await getVacancyBySlug(params.slug, locale, preview)

  if (!story) {
    throw new Response('Not found', { status: 404 })
  }

  if (locale !== defaultLanguage && pathname !== `/${story.full_slug}`) {
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

  if (!rootData) {
    return [
      { title: 'Error' },
      {
        name: 'description',
        content: 'Root data is missing',
      },
    ]
  }

  const slugs = data?.story ? getTranslatedSlugsFromStory(data.story) : []
  const altLinks = createAlternateLinks(slugs, rootData.requestInfo.origin)
  const date = data?.story?.first_published_at
    ? new Date(data.story.first_published_at)
    : new Date()
  const datePosted = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  const breadcrumbs = createBreadcrumbs(location.pathname, rootData.language)

  if (data?.story) {
    const meta = data.story.content.metatags
    return [
      ...getSocialMetas({
        title: meta?.title ?? 'Default Title',
        description: meta?.description ?? 'Default Description',
        image: meta?.og_image ?? 'default-image.png',
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
          title: data.story?.name ?? 'Default Job Title',
          description: data.story?.description ?? 'Default Job Description',
          origin: rootData.requestInfo.origin,
          datePosted,
        }),
      },
    ]
  } else {
    return [
      { title: rootData.errorLabels?.title ?? 'Error' },
      {
        name: 'description',
        content: rootData.errorLabels?.description ?? 'An error occurred',
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
