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
} from '@storyblok/react'

import { getStoryBySlug } from '~/lib/api'
import { SbHeader } from '~/storyblok/header'
import { SbHero } from '~/storyblok/hero'
import { SbPage } from '~/storyblok/page'
import appStyles from '~/styles/app.css'
import tailwindStyles from '~/styles/tailwind.css'
import { isPreview } from '~/utils/storyblok'

storyblokInit({
  accessToken: 'j54nLQ4da3xrIrJdKx0UQwtt',
  use: [apiPlugin],
  components: {
    header: SbHeader,
    page: SbPage,
    hero: SbHero,
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
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: tailwindStyles },
    { rel: 'stylesheet', href: appStyles },
  ]
}

export async function loader({ request }: DataFunctionArgs) {
  const preview = isPreview(request)
  const initialStory = await getStoryBySlug('layout', preview)

  return json({
    initialStory,
    preview,
  })
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
        <StoryblokComponent blok={header} key={header._uid} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
