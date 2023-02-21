import * as React from 'react'

import type {
  DataFunctionArgs,
  LinksFunction,
  MetaFunction,
  SerializeFrom,
} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from '@remix-run/react'

import {
  storyblokInit,
  apiPlugin,
  useStoryblokState,
  StoryblokComponent,
} from '@storyblok/react'

import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import {
  getAllVacancies,
  getDataSource,
  getLayout,
} from '~/lib/storyblok.server'
import { SbButton } from '~/storyblok/button'
import { SbCalculator } from '~/storyblok/calculator'
import { SbFooter } from '~/storyblok/footer'
import { SbGrid } from '~/storyblok/grid'
import { SbHeader } from '~/storyblok/header'
import { SbPage } from '~/storyblok/page'
import { SbQuote } from '~/storyblok/quote'
import { SbRichText } from '~/storyblok/rich-text'
import { SbBlockWithSections } from '~/storyblok/sections/blok-with-sections'
import { SbCareersSection } from '~/storyblok/sections/careers-section'
import { SbClients } from '~/storyblok/sections/clients-section'
import { SbHeaderSection } from '~/storyblok/sections/header-section'
import { SbHeroSection } from '~/storyblok/sections/hero-section'
import { SbPeopleSection } from '~/storyblok/sections/people-section'
import { SbRichTextSection } from '~/storyblok/sections/richtext-section'
import { SbTextSection } from '~/storyblok/sections/text-section'
import { SbVacancy } from '~/storyblok/vacancy'
import appStyles from '~/styles/app.css'
import tailwindStyles from '~/styles/tailwind.css'
import vendorStyles from '~/styles/vendors.css'
import { getEnv } from '~/utils/env.server'
import * as gtag from '~/utils/google-analytics.client'
import { LabelsProvider } from '~/utils/labels-provider'
import {
  getDomainUrl,
  getRequiredGlobalEnvVar,
  removeTrailingSlash,
} from '~/utils/misc'
import { PreviewStateProvider, VacanciesProvider } from '~/utils/providers'
import { isPreview } from '~/utils/storyblok'

// TODO: export from /storblok and use enum as keys
const components = {
  page: SbPage,
  vacancy: SbVacancy,
  header: SbHeader,
  footer: SbFooter,
  hero: SbHeroSection,
  button: SbButton,
  grid: SbGrid,
  richText: SbRichText,
  richTextSection: SbRichTextSection,
  clients: SbClients,
  calculator: SbCalculator,
  textSection: SbTextSection,
  blockWithSections: SbBlockWithSections,
  quote: SbQuote,
  peopleSection: SbPeopleSection,
  careersSection: SbCareersSection,
  headerSection: SbHeaderSection,
}

storyblokInit({
  accessToken: getRequiredGlobalEnvVar('STORYBLOK_ACCESS_TOKEN'),
  use: [apiPlugin],
  // TODO: enable
  // apiOptions: {
  //   cache: {
  //     clear: 'auto',
  //     type: 'memory',
  //   },
  // },
  components,
})

export const meta: MetaFunction = ({ data }) => {
  const requestInfo = data?.requestInfo

  return {
    charset: 'utf-8',
    title: 'Salt',
    viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
    canonical: removeTrailingSlash(`${requestInfo.origin}${requestInfo.path}`),
  }
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Satoshi-Medium.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Satoshi-Bold.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/favicons/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicons/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicons/favicon-16x16.png',
    },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: vendorStyles },
    { rel: 'stylesheet', href: tailwindStyles },
    { rel: 'stylesheet', href: appStyles },
  ]
}

export type LoaderData = SerializeFrom<typeof loader>

export async function loader({ request }: DataFunctionArgs) {
  const preview = isPreview(request)
  const [initialStory, labels, vacancies] = await Promise.all([
    getLayout(),
    getDataSource('labels'),
    getAllVacancies(preview),
  ])

  const data = {
    initialStory,
    preview,
    labels,
    vacancies,
    ENV: getEnv(),
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
  }

  return typedjson(data)
}

export function App() {
  const data = useTypedLoaderData<typeof loader>()
  const story = useStoryblokState(data.initialStory, {}, data.preview)
  const location = useLocation()

  const [header] = story.content.header
  const [footer] = story.content.footer

  React.useEffect(() => {
    if (data.ENV.GOOGLE_ANALYTICS) {
      gtag.pageView(location.pathname, data.ENV.GOOGLE_ANALYTICS)
    }
  }, [data.ENV.GOOGLE_ANALYTICS, location])

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${ENV.GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ENV.GOOGLE_ANALYTICS}');
              gtag('config', '${ENV.GOOGLE_AW_TAG}');
          `,
          }}
        />
      </head>
      <body>
        <StoryblokComponent blok={header} key={header._uid} />
        <Outlet />
        <StoryblokComponent blok={footer} key={footer._uid} />
        <ScrollRestoration />
        <Scripts />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)};`,
          }}
        />
        <LiveReload />
      </body>
    </html>
  )
}

export default function AppWithProviders() {
  const data = useTypedLoaderData<typeof loader>()

  return (
    <PreviewStateProvider value={{ preview: data.preview }}>
      <LabelsProvider data={data.labels}>
        <VacanciesProvider value={{ vacancies: data.vacancies ?? [] }}>
          <App />
        </VacanciesProvider>
      </LabelsProvider>
    </PreviewStateProvider>
  )
}
