import type { SbBlokData } from '@storyblok/react'

import { CardIcon } from '~/components/card'
import type { CardSectionVariant } from '~/components/sections/cards-section'
import { SpacerSizes } from '~/components/spacer'
import { BlokTypes } from '~/storyblok'

// Content that can be on a story of type Page
export type PageStoryContent = {
  title?: string
  subtitle?: string
  body: BodyComponent[]
  metatags: MetaTags
}

export type VacancyStoryContent = {
  title: string
  summary: string
  body: Array<JobDescriptionBlok | BlockWithSectionsBlok>
  metatags: MetaTags
}

export type LayoutStoryContent = {
  navigation: NavigationBlok[]
  footer: FooterBlok[]
}

export type PageBlok = SbBlokData & {
  body: BodyComponent[]
}

export type PageWithChildBlok = SbBlokData & {
  topBody: BodyComponent[]
  bottomBody: BodyComponent[]
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
  menu: LinkBlok[]
  additionalLinks: LinkBlok[]
  location: LocationBlok[]
  socialText: string
}

export type VacancyBlok = SbBlokData & {
  title: string
  summary: string
  body: Array<JobDescriptionBlok | BlockWithSectionsBlok>
}

export type ButtonBlok = SbBlokData & {
  component: BlokTypes.Button
  variant: 'primary' | 'secondary'
  text: string
  link: Link
  anchor?: string
  icon?: string
}

export type CardBlok = SbBlokData & {
  component: BlokTypes.Card
  icon: CardIcon
  title: string
  body: string
  variant: 'light' | 'dark'
}

export type LinkBlok = SbBlokData & {
  component: BlokTypes.Link
  target: Link & { story?: StoryLink }
  text: string
  anchor?: string
}

export type LocationBlok = SbBlokData & {
  component: BlokTypes.Location
  address: string
  directionsLink: LinkBlok[]
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
  subtitle?: string
}

export type BannerBlok = SbBlokData & {
  component: BlokTypes.Banner
  subtitle: string
  text: string
  image: Asset
  imagePosition: 'left' | 'right'
  theme: 'dark' | 'light'
}

export type RichTextBlok = SbBlokData & {
  component: BlokTypes.RichText
  content: string
  theme: 'dark' | 'light'
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
  component: BlokTypes.Section
  icon?: string
  title: string
  text: string
  link?: LinkBlok[]
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
  actions: ButtonBlok[]
}

export type CareersSectionBlok = SbBlokData & {
  component: BlokTypes.CareersSection
  subtitle: string
  title: string
  theme: 'dark' | 'dark-alt' | 'light'
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
  location: LocationBlok[]
  image: Asset
  imageMobile: Asset
  links: LinkBlok[]
}

export type JobDescriptionBlok = SbBlokData & {
  component: BlokTypes.JobDescription
  description: string
  requirements: string
}

export type ImageSectionBlok = SbBlokData & {
  component: BlokTypes.ImageSection
  image: Asset
}

export type TeamMemberBlok = SbBlokData & {
  component: BlokTypes.TeamMember
  name: string
  role: string
  image: Asset
  skills: string
}

export type TeamSectionBlok = SbBlokData & {
  component: BlokTypes.TeamSection
  subtitle: string
  title: string
  members: TeamMemberBlok[]
}

export type ContactSectionBlok = SbBlokData & {
  component: BlokTypes.ContactSection
  title: string
  text: string
  image?: Asset
  theme: 'dark' | 'light'
  actions: ButtonBlok[]
  phoneNumber?: string
}

export type CardsSectionBlok = SbBlokData & {
  component: BlokTypes.CardsSection
  variant: CardSectionVariant
  columns: number
  sectionTitle: string
  bodyTitle: string
  body: string
  cards: CardBlok[]
}

export type SpacerBlok = SbBlokData & {
  component: BlokTypes.Spacer
  size: SpacerSizes
  color: 'black' | 'white'
}

export type BodyComponent =
  | HeroBlok
  | CalculatorBlok
  | TextSectionBlok
  | BlockWithSectionsBlok
  | QuoteBlok
  | BannerBlok
  | PeopleSectionBlok
  | CareersSectionBlok
  | HeaderSectionBlok
  | LocationSectionBlok
  | ImageSectionBlok
  | TeamSectionBlok
  | ContactSectionBlok

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
  story?: StoryLink
}

type StoryLink = {
  full_slug: string
  id: number
  name: string
  slug: strinbg
  url: string
  uuid: string
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
  dimension_value: string | null
}
