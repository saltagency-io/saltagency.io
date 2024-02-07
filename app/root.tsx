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
import { typedjson, useTypedLoaderData } from 'remix-typedjson'
import { AuthenticityTokenProvider } from 'remix-utils/csrf/react'
import { HoneypotProvider } from 'remix-utils/honeypot/react'
import { z } from 'zod'

import {
  GeneralErrorBoundary,
  NotFoundError,
  ServerError,
} from '#app/components/errors.tsx'
import {
  getAllVacancies,
  getDataSource,
  getLayout,
} from '#app/lib/storyblok.server.ts'
import { components } from '#app/storyblok/index.ts'
import appStyles from '#app/styles/app.css'
import tailwindStyles from '#app/styles/tailwind.css'
import vendorStyles from '#app/styles/vendors.css'
import { csrf } from '#app/utils/csrf.server.ts'
import { getEnv } from '#app/utils/env.server.ts'
import { honeypot } from '#app/utils/honeypot.server.ts'
import { I18nProvider, useI18n } from '#app/utils/i18n-provider.tsx'
import { getLanguageFromContext, getLanguageFromPath } from '#app/utils/i18n.ts'
import { LabelsProvider } from '#app/utils/labels-provider.tsx'
import {
  combineHeaders,
  getDomainUrl,
  getUrl,
  removeTrailingSlash,
} from '#app/utils/misc.tsx'
import { useNonce } from '#app/utils/nonce-provider.tsx'
import {
  PreviewStateProvider,
  VacanciesProvider,
} from '#app/utils/providers.tsx'
import { getSocialMetas } from '#app/utils/seo.ts'
import {
  getTranslatedSlugsFromStory,
  isPreview,
} from '#app/utils/storyblok.tsx'
import { SvgGradientReference } from '#app/utils/svg-gradient-reference.tsx'

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

export async function loader({ request, context }: LoaderFunctionArgs) {
  const preview = isPreview(request)
  const language = getLanguageFromContext(context)

  const [layoutStory, labels, vacancies] = await Promise.all([
    getLayout(language, preview),
    getDataSource('labels', language),
    getAllVacancies(language, preview),
  ])

  const honeyProps = honeypot.getInputProps()
  const [csrfToken, csrfCookieHeader] = await csrf.commitToken()

  return typedjson(
    {
      layoutStory,
      preview,
      labels,
      vacancies,
      language,
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
  const { language } = useI18n()
  const fathomQueue = React.useRef<FathomQueue>([])

  return (
    <Document
      env={data.ENV}
      lang={language}
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
      <SvgGradientReference />
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
        <I18nProvider
          language={data.language}
          translatedSlugs={translatedSlugs}
        >
          <PreviewStateProvider value={{ preview: data.preview }}>
            <LabelsProvider data={data.labels}>
              <VacanciesProvider value={{ vacancies: data.vacancies ?? [] }}>
                <App />
              </VacanciesProvider>
            </LabelsProvider>
          </PreviewStateProvider>
        </I18nProvider>
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
  const location = useLocation()
  const language = getLanguageFromPath(location.pathname)

  return (
    <Document nonce={nonce} lang={language}>
      <GeneralErrorBoundary
        statusHandlers={{
          404: NotFoundError,
          500: ServerError,
        }}
      />
    </Document>
  )
}
