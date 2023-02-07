import type {
  DataFunctionArgs,
  LinksFunction,
  MetaFunction,
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
  StoryData,
} from '@storyblok/react'

// import { GridLines } from '~/components/grid'
import { getStoryBySlug } from '~/lib/api'
import { SbButton } from '~/storyblok/button'
import { SbFooter } from '~/storyblok/footer'
import { SbGrid } from '~/storyblok/grid'
import { SbHeader } from '~/storyblok/header'
import { SbHero } from '~/storyblok/hero'
import { SbPage } from '~/storyblok/page'
import { SbRichText } from '~/storyblok/rich-text'
import { SbRichTextSection } from '~/storyblok/sections/rich-text'
import appStyles from '~/styles/app.css'
import tailwindStyles from '~/styles/tailwind.css'
import type { StoryContent } from '~/types'
import { getDomainUrl } from '~/utils/misc'
import { PreviewStateProvider } from '~/utils/providers'
import { isPreview } from '~/utils/storyblok'

export type LoaderData = {
  initialStory: StoryData<StoryContent>
  preview: boolean
  requestInfo: {
    origin: string
    path: string
  }
}

// TODO: use .env
storyblokInit({
  accessToken: 'sLTVnkmM9ESiSUrZ6UJ9qgtt',
  use: [apiPlugin],
  components: {
    page: SbPage,
    header: SbHeader,
    footer: SbFooter,
    hero: SbHero,
    button: SbButton,
    grid: SbGrid,
    richText: SbRichText,
    richTextSection: SbRichTextSection,
  },
})

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Salt',
  viewport: 'width=device-width,initial-scale=1',
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
    { rel: 'stylesheet', href: tailwindStyles },
    { rel: 'stylesheet', href: appStyles },
  ]
}

export async function loader({ request }: DataFunctionArgs) {
  const preview = isPreview(request)
  const initialStory = await getStoryBySlug('layout', preview)

  const data: LoaderData = {
    initialStory,
    preview,
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
  }

  return json(data)
}

export default function App() {
  const { initialStory, preview } = useLoaderData()
  const story = useStoryblokState<any>(initialStory, {}, preview)
  const header = story.content.header[0]
  const footer = story.content.footer[0]

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <PreviewStateProvider value={{ preview }}>
          <StoryblokComponent blok={header} key={header._uid} />
          <Outlet />
          <StoryblokComponent blok={footer} key={footer._uid} />.
          {/*<GridLines />*/}
        </PreviewStateProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
