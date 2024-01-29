import * as React from 'react'

import {
	json,
	redirect,
	type DataFunctionArgs,
	type MetaFunction,
} from '@remix-run/node'
import { useCatch } from '@remix-run/react'
import { StoryblokComponent, useStoryblokState } from '@storyblok/react'
import {
	typedjson,
	UseDataFunctionReturn,
	useTypedLoaderData,
} from 'remix-typedjson'

import { getAllVacancies, getVacancyBySlug } from '#app/lib/storyblok.server.ts'
import type { LoaderData as RootLoaderData } from '#app/root.tsx'
import type { Handle } from '#app/types.ts'
import type { DynamicLinksFunction } from '#app/utils/dynamic-links.tsx'
import {
	defaultLanguage,
	getLanguageFromContext,
	getStaticLabel,
} from '#app/utils/i18n.tsx'
import { createAlternateLinks, getUrl } from '#app/utils/misc.ts'
import { getSocialMetas } from '#app/utils/seo.ts'
import {
	getTranslatedSlugsFromStory,
	isPreview,
} from '#app/utils/storyblok.tsx'

const dynamicLinks: DynamicLinksFunction<
	UseDataFunctionReturn<typeof loader>
> = ({ data, parentsData }) => {
	const requestInfo = parentsData[0].requestInfo
	const slugs = getTranslatedSlugsFromStory(data?.story)
	return createAlternateLinks(slugs, requestInfo.origin)
}

export const handle: Handle = {
	getSitemapEntries: async language => {
		const pages = await getAllVacancies(language)
		return (pages || []).map(page => ({
			route: `/${page.full_slug}`,
			priority: 0.7,
		}))
	},
	dynamicLinks,
}

export async function loader({ params, request, context }: DataFunctionArgs) {
	if (!params.slug) {
		throw new Error('Slug is not defined!')
	}

	const preview = isPreview(request)
	const language = getLanguageFromContext(context)
	const { pathname } = new URL(request.url)

	const story = await getVacancyBySlug(params.slug, language, preview)

	if (!story) {
		throw json({}, { status: 404 })
	}

	if (language !== defaultLanguage && pathname !== `/${story.full_slug}`) {
		throw redirect(`/${story.full_slug}`)
	}

	const data = {
		story,
		preview,
	}

	return typedjson(data, {
		status: 200,
		headers: {
			'Cache-Control': 'private, max-age=3600',
		},
	})
}

export const meta: MetaFunction = ({ data, parentsData }) => {
	const { requestInfo, language } = parentsData.root as RootLoaderData

	if (data?.story) {
		const meta = data.story.content.metatags
		return {
			...getSocialMetas({
				title: meta?.title,
				description: meta?.description,
				url: getUrl(requestInfo),
				image: meta?.og_image,
			}),
		}
	} else {
		return {
			title: getStaticLabel('404.meta.title', language),
			description: getStaticLabel('404.meta.description', language),
		}
	}
}

export default function VacancyPage() {
	const data = useTypedLoaderData()
	const story = useStoryblokState(data.story, {}, data.preview)

	return (
		<main>
			<StoryblokComponent
				blok={story.content}
				publishDate={story.first_published_at}
			/>
		</main>
	)
}
