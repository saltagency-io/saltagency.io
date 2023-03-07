import type { SbBlokData } from '@storyblok/react'

import { BlokTypes } from '~/storyblok'

// Content that can be on a story of type Page
export type PageStoryContent = {
  body: BodyComponents[]
  metatags: MetaTags
}

export type VacancyStoryContent = {
  body: JobDescriptionBlok | BlockWithSectionsBlok
  metatags: MetaTags
}

export type LayoutStoryContent = {
  navigation: NavigationBlok[]
  footer: FooterBlok[]
}

export type LayoutBlok = SbBlokData & {
  navigation: NavigationBlok[]
  footer: FooterBlok[]
}

export type NavigationBlok = SbBlokData & {
  component: BlokTypes.Navigation
  menu: LinkBlok[]
}

export type FooterBlok = SbBlokData & {
  component: BlokTypes.Footer
  disclaimer: string
  socialText: string
}

export type ButtonBlok = SbBlokData & {
  component: BlokTypes.Button
  variant: 'primary' | 'secondary'
  text: string
  link: Link
}

export type LinkBlok = SbBlokData & {
  component: BlokTypes.Link
  target: Link
  text: string
}

export type HeroBlok = SbBlokData & {
  component: BlokTypes.Hero
  title: string
  body: string
  actions: ButtonBlok[]
}

export type ClientsBlok = SbBlokData & {
  component: BlokTypes.Clients
  logos: Asset[]
}

export type CalculatorBlok = SbBlokData & {
  component: BlokTypes.Calculator
  title?: string
}

export type TextSectionBlok = SbBlokData & {
  components: BlokTypes.TextSection
  subtitle: string
  title: string
  body: string
  image?: Asset
  theme: 'dark' | 'light'
}

export type SectionBlok = SbBlokData & {
  component: BlokTypes.BlockWithSections
  icon?: string
  title: string
  text: string
}

export type BlockWithSectionsBlok = SbBlokData & {
  component: BlokTypes.BlockWithSections
  subtitle: string
  title: string
  variant: 'proposition' | 'formula' | 'application-process'
  sections: SectionBlok[]
}

export type QuoteBlok = SbBlokData & {
  component: BlokTypes.Quote
  subtitle?: string
  text: string
  author: string
  avatar: Asset
  variant: 'basic' | 'extended'
  theme: 'light' | 'dark'
}

export type PeopleSectionBlok = SbBlokData & {
  component: BlokTypes.PeopleSection
  subtitle: string
  title: string
  people: Asset[]
}

export type CareersSectionBlok = SbBlokData & {
  component: BlokTypes.CareersSection
  subtitle: string
  title: string
  theme: 'dark' | 'light'
  actions: ButtonBlok[]
}

export type HeaderSectionBlok = SbBlokData & {
  component: BlokTypes.HeaderSection
  title: string
  body: string
}

export type LocationSectionBlok = SbBlokData & {
  component: BlokTypes.LocationSection
  subtitle: string
  title: string
  address: string
  image: Asset
  imageMobile: Asset
  links: LinkBlok[]
}

export type JobDescriptionBlok = SbBlokData & {
  component: BlokTypes.JobDescription
  description: string
  requirements: string
}

export type BodyComponents =
  | HeroBlok
  | CalculatorBlok
  | TextSectionBlok
  | BlockWithSectionsBlok
  | QuoteBlok
  | PeopleSectionBlok
  | CareersSectionBlok
  | HeaderSectionBlok
  | LocationSectionBlok

export type MetaTags = {
  title?: string
  og_image?: string
  og_title?: string
  description?: string
  twitter_image?: string
  twitter_title?: string
  og_description?: string
  twitter_description?: string
}

type Link = {
  id: string
  cached_url: string
  fieldtype: string
  linktype: string
  url: string
}

type Asset = {
  id: number
  alt: string
  name: string
  focus: string
  title: string
  filename: string
  copyright: string
  fieldtype: string
  is_external_url: boolean
}

type DataSourceEntry = {
  id: number
  name: string
  value: string
  dimensions: any[] | null // TODO: type dimensions when we need them
}
