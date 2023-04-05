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
  Scripts,
  ScrollRestoration,
  useCatch,
  useLocation,
  useMatches,
} from '@remix-run/react'

import { storyblokInit, apiPlugin, StoryblokComponent } from '@storyblok/react'

import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import { ErrorPage } from '~/components/errors'
import {
  getAllVacancies,
  getDataSource,
  getLayout,
} from '~/lib/storyblok.server'
import { components } from '~/storyblok'
import appStyles from '~/styles/app.css'
import tailwindStyles from '~/styles/tailwind.css'
import vendorStyles from '~/styles/vendors.css'
import { DynamicLinks } from '~/utils/dynamic-links'
import { getEnv } from '~/utils/env.server'
import {
  getLocaleFromContext,
  getLocaleFromPath,
  getStaticLabel,
} from '~/utils/i18n'
import { I18nProvider, useI18n } from '~/utils/i18n-provider'
import { LabelsProvider } from '~/utils/labels-provider'
import {
  getDomainUrl,
  getRequiredGlobalEnvVar,
  removeTrailingSlash,
} from '~/utils/misc'
import { useNonce } from '~/utils/nonce-provider'
import { PreviewStateProvider, VacanciesProvider } from '~/utils/providers'
import { getTranslatedSlugsFromStory, isPreview } from '~/utils/storyblok'
import { SdLogo } from '~/utils/structured-data'

storyblokInit({
  components,
  accessToken: getRequiredGlobalEnvVar('STORYBLOK_ACCESS_TOKEN'),
  use: [apiPlugin],
  apiOptions: {
    cache: {
      clear: 'auto',
      type: 'memory',
    },
  },
})

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

export async function loader({ request, context }: DataFunctionArgs) {
  const preview = isPreview(request)
  const locale = getLocaleFromContext(context)

  const [layoutStory, labels, vacancies] = await Promise.all([
    getLayout(locale, preview),
    getDataSource('labels', locale),
    getAllVacancies(locale, preview),
  ])

  const data = {
    layoutStory,
    preview,
    labels,
    vacancies,
    locale,
    ENV: getEnv(),
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
  }

  return typedjson(data)
}

export const meta: MetaFunction = () => {
  return {
    charset: 'utf-8',
    title: 'Salt',
    viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
  }
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
  const { locale } = useI18n()
  const fathomQueue = React.useRef<FathomQueue>([])

  return (
    <html lang={locale}>
      <head>
        <Meta />
        <CanonicalUrl
          origin={data.requestInfo.origin}
          fathomQueue={fathomQueue}
        />
        <Links />
        <DynamicLinks />
      </head>
      <body>
        <StoryblokComponent blok={data.layoutStory?.content} />
        <ScrollRestoration nonce={nonce} />
        <SdLogo origin={data.requestInfo.origin} />
        {ENV.NODE_ENV === 'development' ? null : (
          <script
            nonce={nonce}
            src="https://cdn.usefathom.com/script.js"
            data-site="TRHLKHVT"
            data-spa="history"
            data-auto="false" // prevent tracking visit twice on initial page load
            data-excluded-domains="localhost" // TODO: add dev env here when we have this
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
        <Scripts nonce={nonce} />
        <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)};`,
          }}
        />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  )
}

export default function AppWithProviders() {
  const data = useTypedLoaderData<typeof loader>()
  const matches = useMatches()

  const last = matches[matches.length - 1]
  const story = last?.data?.story
  const translatedSlugs = getTranslatedSlugsFromStory(story)

  return (
    <I18nProvider locale={data.locale} translatedSlugs={translatedSlugs}>
      <PreviewStateProvider value={{ preview: data.preview }}>
        <LabelsProvider data={data.labels}>
          <VacanciesProvider value={{ vacancies: data.vacancies ?? [] }}>
            <App />
          </VacanciesProvider>
        </LabelsProvider>
      </PreviewStateProvider>
    </I18nProvider>
  )
}

function ErrorDoc({ children }: { children: React.ReactNode }) {
  const nonce = useNonce()
  const { locale } = useI18n()

  return (
    <html lang={locale}>
      <head>
        <title>Oh no...</title>
        <Links />
      </head>
      <body className="bg-gradient">
        {children}
        <Scripts nonce={nonce} />
      </body>
    </html>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)

  console.error(error)

  return (
    <ErrorDoc>
      <ErrorPage
        error={error}
        errorSectionProps={{
          title: getStaticLabel('500.title', locale),
          subtitle: `${getStaticLabel('500.subtitle', locale)} "${
            location.pathname
          }"`,
          ctaText: getStaticLabel('500.cta', locale),
        }}
      />
    </ErrorDoc>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)

  console.error('CatchBoundary', caught)

  if (caught.status === 404) {
    return (
      <ErrorDoc>
        <ErrorPage
          errorSectionProps={{
            title: getStaticLabel('404.title', locale),
            subtitle: `${getStaticLabel('404.subtitle', locale)} "${
              location.pathname
            }"`,
            ctaText: getStaticLabel('404.cta', locale),
          }}
        />
      </ErrorDoc>
    )
  }

  if (caught.status !== 500) {
    return (
      <ErrorDoc>
        <ErrorPage
          errorSectionProps={{
            title: getStaticLabel('500.title', locale),
            subtitle: `${getStaticLabel('500.subtitle', locale)} "${
              location.pathname
            }"`,
            ctaText: getStaticLabel('500.cta', locale),
          }}
        />
      </ErrorDoc>
    )
  }

  throw new Error(`Unhandled error: ${caught.status}`)
}
