import {
	json,
	redirect,
	type LoaderFunctionArgs,
	type MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { StoryblokComponent, useStoryblokState } from '@storyblok/react'

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

export default function VacanciesRoute() {
	const data = useLoaderData<typeof loader>()
	const story = useStoryblokState(data.story, {})

	return (
		<main>
			<StoryblokComponent blok={story.content} />
		</main>
	)
}
