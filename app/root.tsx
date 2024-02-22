import * as React from 'react'

import {
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLocation,
  useMatches,
} from '@remix-run/react'
import { apiPlugin, StoryblokComponent, storyblokInit } from '@storyblok/react'
import { useTranslation } from 'react-i18next'
import { useChangeLanguage } from 'remix-i18next'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'
import { AuthenticityTokenProvider } from 'remix-utils/csrf/react'
import { HoneypotProvider } from 'remix-utils/honeypot/react'
import { z } from 'zod'

import {
  GeneralErrorBoundary,
  NotFoundError,
  ServerError,
} from '#app/components/errors.tsx'
import { components } from '#app/storyblok/index.ts'
import appStyles from '#app/styles/app.css'
import tailwindStyles from '#app/styles/tailwind.css'
import vendorStyles from '#app/styles/vendors.css'
import { csrf } from '#app/utils/csrf.server.ts'
import { getEnv } from '#app/utils/env.server.ts'
import { honeypot } from '#app/utils/honeypot.server.ts'
import { getLocaleFromRequest } from '#app/utils/i18n.ts'
import {
  combineHeaders,
  getDomainUrl,
  getUrl,
  removeTrailingSlash,
} from '#app/utils/misc.tsx'
import { useNonce } from '#app/utils/nonce-provider.tsx'
import {
  PreviewStateProvider,
  SlugsProvider,
  VacanciesProvider,
} from '#app/utils/providers.tsx'
import { getSocialMetas } from '#app/utils/seo.ts'
import { getAllVacancies, getLayout } from '#app/utils/storyblok.server'
import {
  getTranslatedSlugsFromStory,
  isPreview,
} from '#app/utils/storyblok.tsx'

import { type Handle } from './types'

storyblokInit({
  components,
  accessToken: ENV.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions:
    ENV.MODE === 'production'
      ? {
          cache: {
            clear: 'auto',
            type: 'memory',
          },
        }
      : {},
})

export const handle: Handle = {
  i18n: ['common'],
}

export const links: LinksFunction = () => {
  return [
    { rel: 'preload', as: 'style', href: vendorStyles },
    { rel: 'preload', as: 'style', href: tailwindStyles },
    { rel: 'preload', as: 'style', href: appStyles },
    {
      rel: 'preload',
      as: 'image',
      href: '/images/rain-drops-background.svg',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/nunito-sans-v15-latin-regular.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/nunito-sans-v15-latin-700.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/plus-jakarta-sans-v8-latin-700.woff2',
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

export type RootLoaderType = typeof loader

export async function loader({ request }: LoaderFunctionArgs) {
  const preview = isPreview(request)
  const locale = getLocaleFromRequest(request)

  const [layoutStory, vacancies] = await Promise.all([
    getLayout(locale, preview),
    getAllVacancies(locale, preview),
  ])

  const honeyProps = honeypot.getInputProps()
  const [csrfToken, csrfCookieHeader] = await csrf.commitToken()

  return typedjson(
    {
      layoutStory,
      preview,
      vacancies,
      locale,
      ENV: getEnv(),
      requestInfo: {
        origin: getDomainUrl(request),
        path: new URL(request.url).pathname,
      },
      honeyProps,
      csrfToken,
    },
    {
      headers: combineHeaders(
        csrfCookieHeader ? { 'Set-Cookie': csrfCookieHeader } : null,
      ),
    },
  )
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const requestInfo = data?.requestInfo
  return [
    ...getSocialMetas({
      title: 'Koodin',
      description: 'Wij zijn Koodin, je nieuwe digitale partner',
      keywords:
        'Koodin, Digital Agency, Digital Partner, Lead Consultants, Lead Developers, Lead Designers, Freelance',
      url: getUrl(requestInfo),
    }),
  ]
}

declare global {
  interface Window {
    fathom:
      | {
          trackPageview(): void
          trackGoal(id: string, cents: number): void
        }
      | undefined
  }
}

type FathomQueue = Array<{ command: 'trackPageview' }>

function CanonicalUrl({
  origin,
  fathomQueue,
}: {
  origin: string
  fathomQueue: React.MutableRefObject<FathomQueue>
}) {
  const { pathname } = useLocation()
  const canonicalUrl = removeTrailingSlash(`${origin}${pathname}`)

  React.useEffect(() => {
    if (window.fathom) {
      window.fathom.trackPageview()
    } else {
      fathomQueue.current.push({ command: 'trackPageview' })
    }
    // Fathom looks uses the canonical URL to track visits, so we're using it
    // as a dependency even though we're not using it explicitly
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canonicalUrl])

  return <link rel="canonical" href={canonicalUrl} />
}

export function App() {
  const data = useTypedLoaderData<typeof loader>()
  const nonce = useNonce()
  const fathomQueue = React.useRef<FathomQueue>([])

  useChangeLanguage(data.locale)

  return (
    <Document
      env={data.ENV}
      lang={data.locale}
      nonce={nonce}
      canonical={
        <CanonicalUrl
          origin={data.requestInfo.origin}
          fathomQueue={fathomQueue}
        />
      }
    >
      <StoryblokComponent blok={data.layoutStory?.content} />
      <div id="menuPortal"></div>
      {ENV.MODE === 'development' ? null : (
        <script
          nonce={nonce}
          src="https://cdn.usefathom.com/script.js"
          data-site="TRHLKHVT"
          data-spa="history"
          data-auto="false" // prevent tracking visit twice on initial page load
          data-excluded-domains="localhost,salt.fly.dev,koodin.fly.dev"
          defer
          onLoad={() => {
            fathomQueue.current.forEach(({ command }) => {
              if (window.fathom) {
                window.fathom[command]()
              }
            })
            fathomQueue.current = []
          }}
        />
      )}
    </Document>
  )
}

const RouteWithStorySchema = z.object({
  story: z.any(),
})

export default function AppWithProviders() {
  const data = useTypedLoaderData<typeof loader>()
  const matches = useMatches()

  const lastMatch = matches[matches.length - 1]
  const result = RouteWithStorySchema.safeParse(lastMatch.data)
  const translatedSlugs =
    result.success && result.data.story
      ? getTranslatedSlugsFromStory(result.data.story)
      : []

  return (
    <AuthenticityTokenProvider token={data.csrfToken}>
      <HoneypotProvider {...data.honeyProps}>
        <PreviewStateProvider value={{ preview: data.preview }}>
          <SlugsProvider value={{ slugs: translatedSlugs }}>
            <VacanciesProvider value={{ vacancies: data.vacancies ?? [] }}>
              <App />
            </VacanciesProvider>
          </SlugsProvider>
        </PreviewStateProvider>
      </HoneypotProvider>
    </AuthenticityTokenProvider>
  )
}

function Document({
  children,
  nonce,
  lang,
  env = {},
  canonical = null,
}: {
  children: React.ReactNode
  nonce?: string
  lang: string
  env?: Record<string, string>
  canonical?: React.ReactNode
}) {
  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        {canonical}
      </head>
      <body className="bg-gray-body">
        {children}
        <Scripts nonce={nonce} />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(env)};`,
          }}
        />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  const nonce = useNonce()
  const { i18n } = useTranslation()

  return (
    <Document nonce={nonce} lang={i18n.language}>
      <GeneralErrorBoundary
        statusHandlers={{
          404: NotFoundError,
          500: ServerError,
        }}
      />
    </Document>
  )
}
