import { type SEOHandle } from '@nasa-gcn/remix-seo'

export type NonNullProperties<Type> = {
  [Key in keyof Type]-?: Exclude<Type[Key], null | undefined>
}

export type SitemapEntry = {
  route: string
  lastmod?: string
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority?: 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0
}

export type Handle = SEOHandle & {
  id?: string
}

export type Image = {
  id: string
  url: string
  alt: string
}

export type LinkType = {
  id: string
  url: string
  text: string
}

export type Section = {
  id: string
  icon?: string
  title: string
  text: string
  link?: LinkType
}

export type Vacancy = {
  id: string
  name: string
  slug: string
}

export type Breadcrumb = {
  path: string
  name: string
}

export type TranslatedSlug = {
  path: string
  name: string | null
  lang: string
}

export type GroupTheme =
  | 'light-gray'
  | 'light-gray-decorated'
  | 'dark'
  | 'dark-decorated'
  | 'dark-to-footer'
  | 'light-white'

export * from './storyblok'
