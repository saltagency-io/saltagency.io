import { SbBanner } from '#app/storyblok/banner.tsx'
import { SbLayout } from '#app/storyblok/layout.tsx'
import { SbPageWithChild } from '#app/storyblok/page-with-child.tsx'
import { SbRichText } from '#app/storyblok/rich-text.tsx'
import { SbContactSection } from '#app/storyblok/sections/contact-section.tsx'
import { SbImageSection } from '#app/storyblok/sections/image-section.tsx'
import { SbTeamSection } from '#app/storyblok/sections/team-section.tsx'
import { SbSpacer } from '#app/storyblok/spacer.tsx'

import { SbButton } from './button.tsx'
import { SbCalculator } from './calculator.tsx'
import { SbCard } from './card.tsx'
import { SbFooter } from './footer.tsx'
import { SbGroup } from './group.tsx'
import { SbJobDescription } from './job-description.tsx'
import { SbNavigation } from './navigation.tsx'
import { SbPage } from './page.tsx'
import { SbQuote } from './quote.tsx'
import { SbBlockWithSections } from './sections/block-with-sections.tsx'
import { SbCardsSection } from './sections/cards-section.tsx'
import { SbCareersSection } from './sections/careers-section.tsx'
import { SbClients } from './sections/clients-section.tsx'
import { SbHeaderSection } from './sections/header-section.tsx'
import { SbHeroSection } from './sections/hero-section.tsx'
import { SbLocationSection } from './sections/location-section.tsx'
import { SbPeopleSection } from './sections/people-section.tsx'
import { SbStoriesSection } from './sections/stories-section.tsx'
import { SbTextSection } from './sections/text-section.tsx'
import { SbStory } from './story.tsx'
import { SbVacancy } from './vacancy.tsx'

// Would prefer to put this in types/storyblok.d.ts but that breaks the build for some reason 🤷
export enum BlokTypes {
  // Content types
  Page = 'page',
  PageWithChild = 'pageWithChild',
  Vacancy = 'vacancy',
  Story = 'story',

  // Global components
  Layout = 'layout',
  Navigation = 'navigation',
  Footer = 'footer',
  Group = 'group',

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
  StoriesSection = 'storiesSection',
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
  [BlokTypes.Group]: SbGroup,
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
  [BlokTypes.StoriesSection]: SbStoriesSection,
  [BlokTypes.TextSection]: SbTextSection,
  [BlokTypes.Vacancy]: SbVacancy,
  [BlokTypes.Story]: SbStory,
}
