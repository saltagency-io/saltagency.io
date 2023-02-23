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

export type Handle = {
  id?: string
  getSitemapEntries?: (
    request: Request,
  ) =>
    | Promise<Array<SitemapEntry | null> | null>
    | Array<SitemapEntry | null>
    | null
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
}

export type Vacancy = {
  id: string
  name: string
  slug: string
}

export * from './storyblok'
