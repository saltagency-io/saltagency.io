import * as React from 'react'

import type {
  DataFunctionArgs,
  LinksFunction,
  MetaFunction,
  SerializeFrom,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'

import {
  storyblokInit,
  apiPlugin,
  useStoryblokState,
  StoryblokComponent,
} from '@storyblok/react'

// import { GridLines } from '~/components/grid'
import { getDataSource, getStoryBySlug } from '~/lib/api'
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
import { LabelsProvider } from '~/utils/labels-provider'
import { getDomainUrl, getRequiredGlobalEnvVar } from '~/utils/misc'
import { PreviewStateProvider } from '~/utils/providers'
import { isPreview } from '~/utils/storyblok'

// TODO: use .env
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

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Salt',
  viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
})

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
  const initialStory = await getStoryBySlug('layout', preview)
  const labels = await getDataSource('labels')

  console.log({ labels })

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

  return json(data)
}

export default function App() {
  const data = useLoaderData()
  const story = useStoryblokState<any>(data.initialStory, {}, data.preview)
  const header = story.content.header[0]
  const footer = story.content.footer[0]

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <PreviewStateProvider value={{ preview: data.preview }}>
          <LabelsProvider data={data.labels}>
            <StoryblokComponent blok={header} key={header._uid} />
            <Outlet />
            <StoryblokComponent blok={footer} key={footer._uid} />
            {/*<GridLines />*/}
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
        {ENV.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  )
}
