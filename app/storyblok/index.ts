import { SbButton } from './button'
import { SbCalculator } from './calculator'
import { SbFooter } from './footer'
import { SbGrid } from './grid'
import { SbHeader } from './header'
import { SbJobDescription } from './job-description'
import { SbPage } from './page'
import { SbQuote } from './quote'
import { SbRichText } from './rich-text'
import { SbBlockWithSections } from './sections/blok-with-sections'
import { SbCareersSection } from './sections/careers-section'
import { SbClients } from './sections/clients-section'
import { SbHeaderSection } from './sections/header-section'
import { SbHeroSection } from './sections/hero-section'
import { SbLocationSection } from './sections/location-section'
import { SbPeopleSection } from './sections/people-section'
import { SbRichTextSection } from './sections/richtext-section'
import { SbTextSection } from './sections/text-section'
import { SbVacancy } from './vacancy'

// Would prefer to put this in types/storyblok.d.ts but that breaks the build for some reason 🤷
export enum BlokTypes {
  Page = 'page',
  Header = 'header',
  Footer = 'footer',
  Hero = 'hero',
  Button = 'button',
  Link = 'link',
  RichText = 'richText',
  Grid = 'grid',
  Vacancy = 'vacancy',
  Clients = 'clients',
  RichTextSection = 'richTextSection',
  Calculator = 'calculator',
  TextSection = 'textSection',
  BlockWithSections = 'blockWithSections',
  Quote = 'quote',
  PeopleSection = 'peopleSection',
  CareersSection = 'careersSection',
  HeaderSection = 'headerSection',
  LocationSection = 'locationSection',
  JobDescription = 'jobDescription',
}

export const components = {
  [BlokTypes.Page]: SbPage,
  [BlokTypes.Vacancy]: SbVacancy,
  [BlokTypes.Header]: SbHeader,
  [BlokTypes.Footer]: SbFooter,
  [BlokTypes.Hero]: SbHeroSection,
  [BlokTypes.Button]: SbButton,
  [BlokTypes.Grid]: SbGrid,
  [BlokTypes.RichText]: SbRichText,
  [BlokTypes.RichTextSection]: SbRichTextSection,
  [BlokTypes.Clients]: SbClients,
  [BlokTypes.Calculator]: SbCalculator,
  [BlokTypes.TextSection]: SbTextSection,
  [BlokTypes.BlockWithSections]: SbBlockWithSections,
  [BlokTypes.Quote]: SbQuote,
  [BlokTypes.PeopleSection]: SbPeopleSection,
  [BlokTypes.CareersSection]: SbCareersSection,
  [BlokTypes.HeaderSection]: SbHeaderSection,
  [BlokTypes.LocationSection]: SbLocationSection,
  [BlokTypes.JobDescription]: SbJobDescription,
}
