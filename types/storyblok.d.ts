import type { SbBlokData } from '@storyblok/react'

// Content that can be on a story of type Page
export type PageStoryContent = {
  body: BodyComponents[]
  metatags: MetaTags
}

export type VacancyStoryContent = {
  body: RichTextBlok[]
  metatags: MetaTags
}

export type LayoutStoryContent = {
  header: HeaderBlok[]
  footer: FooterBlok[]
}

export enum BlokTypes {
  Page = 'page',
  Header = 'header',
  Footer = 'footer',
  Hero = 'hero',
  Button = 'button',
  Link = 'link',
  RichText = 'richText',
  Grid = 'grid',
  Clients = 'clients',
  RichTextSection = 'richTextSection',
  Calculator = 'calculator',
  TextSection = 'textSection',
  BlockWithSections = 'blockWithSections',
  Quote = 'quote',
  PeopleSection = 'peopleSection',
  CareersSection = 'careersSection',
}

export type HeaderBlok = SbBlokData & {
  component: BlokTypes.Header
  logo: Asset
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

export type RichTextBlok = SbBlokData & {
  component: BlokTypes.RichText
  body: string
}

export type HeroBlok = SbBlokData & {
  component: BlokTypes.Hero
  title: string
  body: string
  actions: ButtonBlok[]
}

export type RichTextSectionBlok = SbBlokData & {
  component: BlokTypes.RichTextSection
  body: string
}

export type GridBlok = SbBlokData & {
  component: BlokTypes.Grid
  columns: number
  components: RichTextBlok[]
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
  actions: ButtonBlok[]
}

export type BodyComponents =
  | HeroBlok
  | CalculatorBlok
  | TextSectionBlok
  | BlockWithSectionsBlok
  | QuoteBlok
  | PeopleSectionBlok
  | CareersSectionBlok

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
