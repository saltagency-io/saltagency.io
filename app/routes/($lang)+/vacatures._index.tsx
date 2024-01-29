import {
	json,
	MetaFunction,
	redirect,
	type LoaderFunctionArgs,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { StoryblokComponent, useStoryblokState } from '@storyblok/react'

import { getStoryBySlug } from '#app/lib/storyblok.server.ts'
import type { LoaderData as RootLoaderData } from '#app/root.tsx'
import type { Handle } from '#app/types.ts'
import type { DynamicLinksFunction } from '#app/utils/dynamic-links.tsx'
import {
	defaultLanguage,
	getLanguageFromContext,
	getStaticLabel,
	SupportedLanguage,
} from '#app/utils/i18n.ts'
import { createAlternateLinks, getUrl } from '#app/utils/misc.tsx'
import { getSocialMetas } from '#app/utils/seo.ts'
import { getTranslatedSlugsFromStory, isPreview } from '#app/utils/storyblok.ts'

export const routes: Record<SupportedLanguage, string> = {
	en: 'careers',
	nl: 'vacatures',
}

const dynamicLinks: DynamicLinksFunction<any> = ({ data, parentsData }) => {
	const requestInfo = parentsData[0].requestInfo
	const slugs = getTranslatedSlugsFromStory(data?.story)
	return createAlternateLinks(slugs, requestInfo.origin)
}

export const handle: Handle = {
	getSitemapEntries: language => {
		return [
			{
				route: `${language === defaultLanguage ? '' : `/${language}`}/${
					routes[language]
				}`,
				priority: 0.5,
			},
		]
	},
	dynamicLinks,
}

export const meta: MetaFunction = ({ data, parentsData }) => {
	const { requestInfo, language } = parentsData.root as RootLoaderData

	if (data.story) {
		const meta = data.story.content.metatags
		return {
			...getSocialMetas({
				title: meta?.title,
				description: meta?.description,
				image: meta?.og_image,
				url: getUrl(requestInfo),
			}),
		}
	} else {
		return {
			title: getStaticLabel('404.meta.title', language),
			description: getStaticLabel('404.meta.description', language),
		}
	}
}

export async function loader({ request, context }: LoaderFunctionArgs) {
	const preview = isPreview(request)
	const language = getLanguageFromContext(context)
	const { pathname } = new URL(request.url)

	const story = await getStoryBySlug('vacatures/', language, preview)

	if (!story) {
		throw json({}, { status: 404 })
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
