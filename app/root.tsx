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

import { getDataSource, getLayout } from '~/lib/api'
import { SbButton } from '~/storyblok/button'
import { SbFooter } from '~/storyblok/footer'
import { SbGrid } from '~/storyblok/grid'
import { SbHeader } from '~/storyblok/header'
import { SbHero } from '~/storyblok/hero'
import { SbPage } from '~/storyblok/page'
import { SbRichText } from '~/storyblok/rich-text'
import { SbClients } from '~/storyblok/sections/clients'
import { SbRichTextSection } from '~/storyblok/sections/rich-text'
import { SbVacancy } from '~/storyblok/vacancy'
import appStyles from '~/styles/app.css'
import tailwindStyles from '~/styles/tailwind.css'
import vendorStyles from '~/styles/vendors.css'
import { getEnv } from '~/utils/env.server'
import * as gtag from '~/utils/ga.client'
import { LabelsProvider } from '~/utils/labels-provider'
import {
  getDomainUrl,
  getRequiredGlobalEnvVar,
  removeTrailingSlash,
} from '~/utils/misc'
import { PreviewStateProvider } from '~/utils/providers'
import { isPreview } from '~/utils/storyblok'

storyblokInit({
  accessToken: getRequiredGlobalEnvVar('STORYBLOK_ACCESS_TOKEN'),
  use: [apiPlugin],
  components: {
    page: SbPage,
    vacancy: SbVacancy,
    header: SbHeader,
    footer: SbFooter,
    hero: SbHero,
    button: SbButton,
    grid: SbGrid,
    richText: SbRichText,
    richTextSection: SbRichTextSection,
    clients: SbClients,
  },
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
      href: '/fonts/Lexend-Light.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Lexend-Light.woff2',
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
  const initialStory = await getLayout()
  const labels = await getDataSource('labels')

  const data = {
    initialStory,
    preview,
    labels,
    ENV: getEnv(),
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
  }

  return typedjson(data)
}

export default function App() {
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
    <React.StrictMode>
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
          <PreviewStateProvider value={{ preview: data.preview }}>
            <LabelsProvider data={data.labels}>
              <StoryblokComponent blok={header} key={header._uid} />
              <Outlet />
              <StoryblokComponent blok={footer} key={footer._uid} />
            </LabelsProvider>
          </PreviewStateProvider>
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
    </React.StrictMode>
  )
}
