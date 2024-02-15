import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { StoryblokComponent, useStoryblokState } from '@storyblok/react'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import { GeneralErrorBoundary, NotFoundError } from '#app/components/errors.tsx'
import {
  getStoriesForSitemap,
  getStoryBySlug,
} from '#app/lib/storyblok.server.ts'
import { type RootLoaderType } from '#app/root.tsx'
import { type Handle } from '#app/types.ts'
import {
  defaultLanguage,
  getLanguageFromContext,
  getLanguageFromPath,
  getStaticLabel,
  isSupportedLanguage,
} from '#app/utils/i18n.ts'
import { getJsonLdLogo } from '#app/utils/json-ld.ts'
import {
  createAlternateLinks,
  getUrl,
  removeTrailingSlash,
} from '#app/utils/misc.tsx'
import { getSocialMetas } from '#app/utils/seo.ts'
import {
  getTranslatedSlugsFromStory,
  isPreview,
} from '#app/utils/storyblok.tsx'

export const handle: Handle = {
  getSitemapEntries: async request => {
    const { pathname } = new URL(request.url)
    const language = getLanguageFromPath(pathname)
    const pages = await getStoriesForSitemap(language)
    return pages.map(page => ({
      route: removeTrailingSlash(
        `${
          page.slug === 'home'
            ? `${language === defaultLanguage ? '' : `/${language}`}`
            : `/${page.full_slug}`
        }`,
      ),
      priority: 0.4,
    }))
  },
}

export async function loader({ params, request, context }: LoaderFunctionArgs) {
  const preview = isPreview(request)
  const language = getLanguageFromContext(context)
  const { pathname } = new URL(request.url)

  console.log({ language })

  console.log({ params })

  // Include whatever is in params.lang if it is not a supported language.
  // This way we support arbitrary nested routes.
  const slugStart =
    params.slug && !isSupportedLanguage(params.lang) ? `${params.lang}/` : ''

  const slugOrHome =
    !params.slug && params.lang === language
      ? 'home'
      : params.slug ?? params.lang ?? 'home'

  const slug = `${slugStart}${slugOrHome}`

  console.log({ slug })

  const story = await getStoryBySlug(slug, language, preview)

  if (!story) {
    throw new Response('Not found', { status: 404 })
  }

  if (pathname.includes('home')) {
    throw redirect('/')
  }

  // Home page has slug "home" but we don't want that url to work
  if (pathname.includes('home')) {
    throw redirect(language === defaultLanguage ? '/' : `/${language}`)
  }

  // Make sure a translated story cannot be requested using the default slug (e.g. /nl/about)
  if (
    story.slug !== 'home' &&
    language !== defaultLanguage &&
    pathname !== `/${story.full_slug}`
  ) {
    throw redirect(`/${story.full_slug}`)
  }

  return typedjson(
    {
      story,
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
