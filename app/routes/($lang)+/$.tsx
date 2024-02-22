import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { StoryblokComponent, useStoryblokState } from '@storyblok/react'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import { GeneralErrorBoundary, NotFoundError } from '#app/components/errors.tsx'
import { type RootLoaderType } from '#app/root.tsx'
import { type Handle } from '#app/types.ts'
import { defaultLanguage, getLocaleFromRequest } from '#app/utils/i18n.ts'
import { getJsonLdLogo } from '#app/utils/json-ld.ts'
import {
  createAlternateLinks,
  getUrl,
  removeTrailingSlash,
} from '#app/utils/misc.tsx'
import { getSocialMetas } from '#app/utils/seo.ts'
import {
  getStoriesForSitemap,
  getStoryBySlug,
} from '#app/utils/storyblok.server.ts'
import {
  getTranslatedSlugsFromStory,
  isPreview,
} from '#app/utils/storyblok.tsx'

export const handle: Handle = {
  getSitemapEntries: async request => {
    const locale = getLocaleFromRequest(request)
    const pages = await getStoriesForSitemap(locale)
    return pages.map(page => ({
      route: removeTrailingSlash(
        `${
          page.slug === 'home'
            ? `${locale === defaultLanguage ? '' : `/${locale}`}`
            : `/${page.full_slug}`
        }`,
      ),
      priority: 0.4,
    }))
  },
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const preview = isPreview(request)
  const locale = getLocaleFromRequest(request)
  const { pathname } = new URL(request.url)
  const slug = locale === defaultLanguage ? params.lang : params['*']

  const story = await getStoryBySlug(slug ?? 'home', locale, preview)

  if (!story) {
    throw new Response('Not found', { status: 404 })
  }

  // Home page has slug "home" but we don't want that url to work
  if (pathname.includes('home') && !preview) {
    throw redirect(locale === defaultLanguage ? '/' : `/${locale}`)
  }

  // Make sure a translated story cannot be requested using the default slug (e.g. /nl/about)
  if (
    story.slug !== 'home' &&
    locale !== defaultLanguage &&
    pathname !== `/${removeTrailingSlash(story.full_slug)}`
  ) {
    throw redirect(`/${story.full_slug}`)
  }

  return typedjson(
    {
      story,
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
        content: rootData.errorLabels.subtitle,
      },
    ]
  }
}

export default function SlugRoute() {
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
