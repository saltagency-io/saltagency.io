import {
	json,
	redirect,
	type LoaderFunctionArgs,
	type MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { StoryblokComponent, useStoryblokState } from '@storyblok/react'

import { GeneralErrorBoundary, NotFoundError } from '#app/components/errors.tsx'
import {
	getStoriesForSitemap,
	getStoryBySlug,
} from '#app/lib/storyblok.server.ts'
import { pathedRoutes } from '#app/other-routes.server.ts'
import { type RootLoaderType } from '#app/root.tsx'
import { type Handle } from '#app/types.ts'
import {
	defaultLanguage,
	getLanguageFromContext,
	getStaticLabel,
	isSupportedLanguage,
} from '#app/utils/i18n.ts'
import { createAlternateLinks, getUrl } from '#app/utils/misc.tsx'
import { getSocialMetas } from '#app/utils/seo.ts'
import {
	getTranslatedSlugsFromStory,
	isPreview,
} from '#app/utils/storyblok.tsx'

export const handle: Handle = {
	getSitemapEntries: async language => {
		const pages = await getStoriesForSitemap(language)
		return pages.map(page => ({
			route: `${
				page.slug === 'home'
					? `${language === defaultLanguage ? '' : `/${language}`}`
					: `/${page.full_slug}`
			}`,
			priority: 0.4,
		}))
	},
}

export async function loader({ params, request, context }: LoaderFunctionArgs) {
	const preview = isPreview(request)
	const language = getLanguageFromContext(context)
	const { pathname } = new URL(request.url)

	// Block the layout path when not in preview mode
	if (pathedRoutes[pathname] || (!preview && pathname === '/layout')) {
		throw new Response('Use other route', { status: 404 })
	}

	// Include whatever is in params.lang if it is not a supported langauge.
	// This way we support arbitrary nested routes.
	const slugStart =
		params.slug && !isSupportedLanguage(params.lang) ? `${params.lang}/` : ''
	const slugOrHome =
		!params.slug && params.lang === language
			? 'home'
			: params.slug ?? params.lang ?? 'home'
	const slug = `${slugStart}${slugOrHome}`

	const story = await getStoryBySlug(slug, language, preview)

	if (!story) {
		throw json({}, { status: 404 })
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

	const data = {
		story,
		preview,
	}

	return json(data, {
		headers: {
			'Cache-Control': 'private, max-age=3600',
		},
	})
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
	const data = useLoaderData<typeof loader>()
	const story = useStoryblokState(data.story, {})

	return (
		<main>
			<StoryblokComponent blok={story.content} />
		</main>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary statusHandlers={{ 404: NotFoundError }} />
}
