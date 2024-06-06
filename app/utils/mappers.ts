import { type ISbStoryData as StoryData } from '@storyblok/react'
import { useTranslation } from 'react-i18next'

import {
  Story,
  StoryPostContent,
  type Asset,
  type Image,
  type LinkBlok,
  type LinkType,
  type Section,
  type SectionBlok,
  type Vacancy,
  type VacancyStoryContent,
} from '#app/types.ts'
import { defaultLanguage } from '#app/utils/i18n.ts'
import { removeTrailingSlash } from '#app/utils/misc.tsx'

export function formatUrl(url: string, language: string, anchor?: string) {
  if (url.includes(':')) {
    return url
  }

  let formatted = url

  if (url === 'home' || url === `${language}/home`) {
    formatted = language !== defaultLanguage ? `/${language}` : '/'
  }
  if (!formatted.startsWith('/')) {
    formatted = `/${formatted}`
  }
  if (language === defaultLanguage && formatted.includes(defaultLanguage)) {
    formatted = formatted.replace(defaultLanguage, '')
  }
  if (anchor) {
    formatted = `${formatted}${anchor.startsWith('#') ? anchor : `#${anchor}`}`
  }

  return removeTrailingSlash(formatted)
}

export function mapLink(language: string = defaultLanguage) {
  return (link: LinkBlok): LinkType => {
    const urlTarget =
      link.target.linktype === 'story' && link.target.story?.full_slug
        ? link.target.story?.full_slug
        : link.target.cached_url

    return {
      id: link?._uid ?? '',
      url: formatUrl(urlTarget ?? '', language, link.anchor),
      text: link?.text,
    }
  }
}

export function mapAsset(asset: Asset): Image {
  return {
    id: asset.id?.toString() ?? '',
    url: asset.filename,
    alt: asset.alt,
  }
}

export function useLocalizedMappers() {
  const { i18n } = useTranslation()
  return {
    mapLink: mapLink(i18n.language),
    mapSection: mapSection(i18n.language),
    mapVacancy: mapVacancy(i18n.language),
    mapStories: mapStories(i18n.language),
  }
}

export function mapSection(language = defaultLanguage) {
  return (section: SectionBlok): Section => ({
    id: section._uid ?? '',
    icon: section.icon,
    title: section.title,
    text: section.text,
    link:
      Array.isArray(section.link) && section.link.length
        ? mapLink(language)(section.link[0])
        : undefined,
  })
}

export function mapVacancy(language = defaultLanguage) {
  return (vacancy: StoryData<VacancyStoryContent>): Vacancy => {
    let slug = ''
    if (language === defaultLanguage) {
      slug = vacancy.default_full_slug ?? ''
    } else {
      const translatedSlug = vacancy.translated_slugs?.find(
        slug => slug.lang === language,
      )
      slug = `${translatedSlug?.lang}/${translatedSlug?.path}`
    }

    return {
      id: vacancy.id?.toString() ?? '',
      name: vacancy.name,
      slug: slug,
    }
  }
}

export function mapStories(language = defaultLanguage) {
  return (stories: StoryData<StoryPostContent>): Story => {
    let slug = ''
    if (language === defaultLanguage) {
      slug = stories.default_full_slug ?? ''
    } else {
      const translatedSlug = stories.translated_slugs?.find(
        slug => slug.lang === language,
      )
      slug = `${translatedSlug?.lang}/${translatedSlug?.path}`
    }

    return {
      id: stories.id?.toString() ?? '',
      name: stories.name,
      slug: slug,
      content: {
        intro: stories.content.intro,
        image: stories.content.image,
        title: stories.content.title,
        published_at: stories.content.published_at,
      },
    }
  }
}

