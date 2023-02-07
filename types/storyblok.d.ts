import type { SbBlokData } from '@storyblok/react'

// Content that can be on a story of type Page
export type StoryContent = {
  body: Array<BodyComponents>
  metatags: MetaTags
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
}

export type HeaderBlok = SbBlokData & {
  component: BlokTypes.Header
  logo: Asset
  menu: LinkBlok[]
}

export type FooterBlok = SbBlokData & {
  component: BlokTypes.Footer
  logo: Asset
  menu: LinkBlok[]
  legalLinks: LinkBlok[]
  disclaimer: string
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
  image: Asset
  primaryAction: ButtonBlok[]
  secondaryAction: ButtonBlok[]
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
  title: string
  logos: Asset[]
}

export type BodyComponents = HeroBlok | RichTextSectionBlok | GridBlok

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
