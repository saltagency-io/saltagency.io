import * as React from 'react'

import {
  storyblokEditable,
  type SbBlokData,
  type ISbStoryData as StoryData,
} from '@storyblok/react'

import {
  type PageStoryContent,
  type TranslatedSlug,
  type VacancyStoryContent,
} from '#app/types.ts'
import { defaultLanguage } from '#app/utils/i18n.ts'
import { usePreviewState } from '#app/utils/providers.tsx'

export function isPreview(request: Request) {
  const { searchParams } = new URL(request.url)
  return !!searchParams.get('_storyblok')
}

function mapHomeToRoot(slug: TranslatedSlug) {
  return { ...slug, path: slug.path === 'home' ? '' : slug.path }
}

export function getTranslatedSlugsFromStory(
  story: StoryData<PageStoryContent | VacancyStoryContent> | undefined,
): TranslatedSlug[] {
  if (!story) return []

  if (story.lang === defaultLanguage) {
    return (story.translated_slugs || [])
      .filter(story => story.lang === defaultLanguage)
      .map(mapHomeToRoot)
  } else {
    return [
      {
        lang: defaultLanguage,
        name: story.name,
        path: story.default_full_slug ?? '',
      },
      ...(story.translated_slugs || []).filter(
        slug => slug.lang !== story.lang,
      ),
    ].map(mapHomeToRoot)
  }
}

export function StoryBlokWrapper({
  children,
  blok,
}: {
  children: React.ReactNode
  blok: SbBlokData
}) {
  const { preview } = usePreviewState()

  if (preview) {
    return (
      <div {...storyblokEditable(blok)} key={blok._uid}>
        {children}
      </div>
    )
  }

  return <>{children}</>
}
