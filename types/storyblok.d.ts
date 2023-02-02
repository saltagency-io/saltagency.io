import type { SbBlokData } from '@storyblok/react'

export enum BlokTypes {
  Page = 'page',
  Header = 'header',
  Hero = 'hero',
  Button = 'button',
  Link = 'link',
}

export type HeaderBlok = SbBlokData & {
  component: BlokTypes.Header
  logo: Asset
  menu: LinkBlok[]
}

export type HeroBlok = SbBlokData & {
  component: BlokTypes.Hero
  title: string
  body: string
  image: Asset
  primaryAction: ButtonBlok[]
  secondaryAction: ButtonBlok[]
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
