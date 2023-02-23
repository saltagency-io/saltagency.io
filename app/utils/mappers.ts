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

function formatUrl(url: string) {
  let formatted = url
  if (url === 'home') {
    formatted = `/`
  }
  if (!formatted.startsWith('/')) {
    formatted = `/${formatted}`
  }
  return formatted
}

export function mapLink(link: LinkBlok): LinkType {
  return {
    id: link._uid,
    url: formatUrl(link.target.cached_url),
    text: link.text,
  }
}

export function mapAsset(asset: Asset): Image {
  return {
    id: asset.id.toString(),
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
  }
}

export function mapVacancy(vacancy: StoryData<VacancyStoryContent>): Vacancy {
  return {
    id: vacancy.id.toString(),
    name: vacancy.name,
    slug: vacancy.full_slug,
  }
}
