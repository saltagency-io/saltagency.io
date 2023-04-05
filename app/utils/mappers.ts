import type { StoryData } from '@storyblok/react'

import type {
  Asset,
  Image,
  LinkBlok,
  LinkType,
  Section,
  SectionBlok,
  Vacancy,
  VacancyStoryContent,
} from '~/types'
import { defaultLocale, SupportedLocale } from '~/utils/i18n'
import { useI18n } from '~/utils/i18n-provider'
import { removeTrailingSlash } from '~/utils/misc'

export function formatUrl(
  url: string,
  locale: SupportedLocale,
  anchor?: string,
) {
  if (url.includes(':')) {
    return url
  }

  let formatted = url

  if (url === 'home' || url === `${locale}/home`) {
    formatted = locale !== defaultLocale ? `/${locale}` : '/'
  }
  if (!formatted.startsWith('/')) {
    formatted = `/${formatted}`
  }
  if (anchor) {
    formatted = `${formatted}${anchor.startsWith('#') ? anchor : `#${anchor}`}`
  }

  return removeTrailingSlash(formatted)
}

export function mapLink(locale: SupportedLocale = defaultLocale) {
  return (link: LinkBlok): LinkType => {
    const urlTarget =
      link.target.linktype === 'story' && link.target.story?.full_slug
        ? link.target.story?.full_slug
        : link.target.cached_url

    return {
      id: link?._uid,
      url: formatUrl(urlTarget ?? '', locale, link.anchor),
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
  const { locale } = useI18n()
  return {
    mapLink: mapLink(locale),
    mapSection: mapSection(locale),
    mapVacancy: mapVacancy(locale),
  }
}

export function mapSection(locale = defaultLocale) {
  return (section: SectionBlok): Section => ({
    id: section._uid,
    icon: section.icon,
    title: section.title,
    text: section.text,
    link:
      Array.isArray(section.link) && section.link.length
        ? mapLink(locale)(section.link[0])
        : undefined,
  })
}

export function mapVacancy(lang = defaultLocale) {
  return (vacancy: StoryData<VacancyStoryContent>): Vacancy => {
    let slug = ''
    if (lang === defaultLocale) {
      slug = vacancy.default_full_slug ?? ''
    } else {
      const translatedSlug = vacancy.translated_slugs?.find(
        (slug) => slug.lang === lang,
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
