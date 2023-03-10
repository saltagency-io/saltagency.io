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
import { removeTrailingSlash } from '~/utils/misc'

function formatUrl(url: string, anchor?: string) {
  let formatted = url
  if (url === 'home') {
    formatted = `/`
  }
  if (!formatted.startsWith('/') && !formatted.startsWith('http')) {
    formatted = `/${formatted}`
  }
  if (anchor) {
    formatted = `${formatted}${anchor.startsWith('#') ? anchor : `#${anchor}`}`
  }
  return removeTrailingSlash(formatted)
}

export function mapLink(link: LinkBlok): LinkType {
  return {
    id: link?._uid,
    url: formatUrl(link?.target.cached_url ?? '', link.anchor),
    text: link?.text,
  }
}

export function mapAsset(asset: Asset): Image {
  return {
    id: asset.id?.toString() ?? '',
    url: asset.filename,
    alt: asset.alt,
  }
}

export function mapSection(section: SectionBlok): Section {
  return {
    id: section._uid,
    icon: section.icon,
    title: section.title,
    text: section.text,
    link:
      Array.isArray(section.link) && section.link.length
        ? mapLink(section.link[0])
        : undefined,
  }
}

export function mapVacancy(vacancy: StoryData<VacancyStoryContent>): Vacancy {
  return {
    id: vacancy.id?.toString() ?? '',
    name: vacancy.name,
    slug: vacancy.full_slug,
  }
}
