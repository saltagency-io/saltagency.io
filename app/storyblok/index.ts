import { SbButton } from './button'
import { SbCalculator } from './calculator'
import { SbCard } from './card'
import { SbFooter } from './footer'
import { SbJobDescription } from './job-description'
import { SbNavigation } from './navigation'
import { SbPage } from './page'
import { SbQuote } from './quote'
import { SbBlockWithSections } from './sections/block-with-sections'
import { SbCardsSection } from './sections/cards-section'
import { SbCareersSection } from './sections/careers-section'
import { SbClients } from './sections/clients-section'
import { SbHeaderSection } from './sections/header-section'
import { SbHeroSection } from './sections/hero-section'
import { SbLocationSection } from './sections/location-section'
import { SbPeopleSection } from './sections/people-section'
import { SbTextSection } from './sections/text-section'
import { SbVacancy } from './vacancy'
import { SbBanner } from '~/storyblok/banner'
import { SbLayout } from '~/storyblok/layout'
import { SbPageWithChild } from '~/storyblok/page-with-child'
import { SbRichText } from '~/storyblok/rich-text'
import { SbContactSection } from '~/storyblok/sections/contact-section'
import { SbImageSection } from '~/storyblok/sections/image-section'
import { SbTeamSection } from '~/storyblok/sections/team-section'
import { SbSpacer } from '~/storyblok/spacer'

// Would prefer to put this in types/storyblok.d.ts but that breaks the build for some reason 🤷
export enum BlokTypes {
  // Content types
  Page = 'page',
  PageWithChild = 'pageWithChild',
  Vacancy = 'vacancy',

  // Global components
  Layout = 'layout',
  Navigation = 'navigation',
  Footer = 'footer',

  // Nested Components
  Button = 'button',
  Link = 'link',
  Location = 'location',
  TeamMember = 'teamMember',
  Section = 'section',
  Card = 'card',

  // Components
  Hero = 'hero',
  Quote = 'quote',
  Clients = 'clients',
  Calculator = 'calculator',
  JobDescription = 'jobDescription',
  Banner = 'banner',
  Spacer = 'spacer',
  RichText = 'richText',

  // Sections
  BlockWithSections = 'blockWithSections',
  TextSection = 'textSection',
  PeopleSection = 'peopleSection',
  CareersSection = 'careersSection',
  HeaderSection = 'headerSection',
  LocationSection = 'locationSection',
  ImageSection = 'imageSection',
  TeamSection = 'teamSection',
  ContactSection = 'contactSection',
  CardsSection = 'cardsSection',
}

export const components = {
  [BlokTypes.Banner]: SbBanner,
  [BlokTypes.BlockWithSections]: SbBlockWithSections,
  [BlokTypes.Button]: SbButton,
  [BlokTypes.Calculator]: SbCalculator,
  [BlokTypes.Card]: SbCard,
  [BlokTypes.CardsSection]: SbCardsSection,
  [BlokTypes.CareersSection]: SbCareersSection,
  [BlokTypes.Clients]: SbClients,
  [BlokTypes.ContactSection]: SbContactSection,
  [BlokTypes.Footer]: SbFooter,
  [BlokTypes.HeaderSection]: SbHeaderSection,
  [BlokTypes.Hero]: SbHeroSection,
  [BlokTypes.ImageSection]: SbImageSection,
  [BlokTypes.JobDescription]: SbJobDescription,
  [BlokTypes.Layout]: SbLayout,
  [BlokTypes.LocationSection]: SbLocationSection,
  [BlokTypes.Navigation]: SbNavigation,
  [BlokTypes.Page]: SbPage,
  [BlokTypes.PageWithChild]: SbPageWithChild,
  [BlokTypes.PeopleSection]: SbPeopleSection,
  [BlokTypes.Quote]: SbQuote,
  [BlokTypes.RichText]: SbRichText,
  [BlokTypes.Spacer]: SbSpacer,
  [BlokTypes.TeamSection]: SbTeamSection,
  [BlokTypes.TextSection]: SbTextSection,
  [BlokTypes.Vacancy]: SbVacancy,
}
