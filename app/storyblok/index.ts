import type * as React from 'react'

import type { SbBlokData } from '@storyblok/react'

import { SbButton } from './button'
import { SbCalculator } from './calculator'
import { SbFooter } from './footer'
import { SbJobDescription } from './job-description'
import { SbNavigation } from './navigation'
import { SbPage } from './page'
import { SbQuote } from './quote'
import { SbBlockWithSections } from './sections/block-with-sections'
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

  // Components
  Hero = 'hero',
  Quote = 'quote',
  Clients = 'clients',
  Calculator = 'calculator',
  JobDescription = 'jobDescription',
  Banner = 'banner',
  Spacer = 'spacer',

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
}

export const components = {
  [BlokTypes.Page]: SbPage,
  [BlokTypes.Vacancy]: SbVacancy,
  [BlokTypes.PageWithChild]: SbPageWithChild,
  [BlokTypes.Layout]: SbLayout,
  [BlokTypes.Navigation]: SbNavigation,
  [BlokTypes.Footer]: SbFooter,
  [BlokTypes.Button]: SbButton,
  [BlokTypes.Hero]: SbHeroSection,
  [BlokTypes.Clients]: SbClients,
  [BlokTypes.Calculator]: SbCalculator,
  [BlokTypes.TextSection]: SbTextSection,
  [BlokTypes.BlockWithSections]: SbBlockWithSections,
  [BlokTypes.JobDescription]: SbJobDescription,
  [BlokTypes.Quote]: SbQuote,
  [BlokTypes.Banner]: SbBanner,
  [BlokTypes.Spacer]: SbSpacer,
  [BlokTypes.PeopleSection]: SbPeopleSection,
  [BlokTypes.CareersSection]: SbCareersSection,
  [BlokTypes.HeaderSection]: SbHeaderSection,
  [BlokTypes.LocationSection]: SbLocationSection,
  [BlokTypes.ImageSection]: SbImageSection,
  [BlokTypes.TeamSection]: SbTeamSection,
  [BlokTypes.ContactSection]: SbContactSection,
}
