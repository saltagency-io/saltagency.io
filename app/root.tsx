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
import * as gtag from '~/utils/gtag.client'
import {
  getLanguageFromContext,
  getLanguageFromPath,
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
  const language = getLanguageFromContext(context)

  const [layoutStory, labels, vacancies] = await Promise.all([
    getLayout(language, preview),
    getDataSource('labels', language),
    getAllVacancies(language, preview),
  ])

  const data = {
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

function CanonicalUrl({ origin }: { origin: string }) {
  const { pathname } = useLocation()
  const canonicalUrl = removeTrailingSlash(`${origin}${pathname}`)

  return <link rel="canonical" href={canonicalUrl} />
}

export function App() {
  const data = useTypedLoaderData<typeof loader>()
  const nonce = useNonce()
  const location = useLocation()
  const { language } = useI18n()

  React.useEffect(() => {
    if (data.ENV.GOOGLE_ANALYTICS?.length) {
      gtag.pageView(location.pathname, data.ENV.GOOGLE_ANALYTICS)
    }
  }, [data.ENV.GOOGLE_ANALYTICS, location])

  return (
    <html lang={language}>
      <head>
        <Meta />
        <CanonicalUrl origin={data.requestInfo.origin} />

        <Links />
        <DynamicLinks />

        {process.env.NODE_ENV === 'development' ||
        !data.ENV.GOOGLE_ANALYTICS ? null : (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <script
              async
              nonce={nonce}
              src={`https://www.googletagmanager.com/gtag/js?id=${data.ENV.GOOGLE_ANALYTICS}`}
            />
            <script
              async
              nonce={nonce}
              src={`https://www.googletagmanager.com/gtag/js?id=${data.ENV.GOOGLE_AW_TAG}`}
            />
            <script
              async
              id="gtag-init"
              nonce={nonce}
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${data.ENV.GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname
              });
              gtag('config', '${data.ENV.GOOGLE_AW_TAG}', {
                page_path: window.location.pathname
              });
              `,
              }}
            />
          </>
        )}
        <SdLogo origin={data.requestInfo.origin} />
      </head>
      <body>
        <StoryblokComponent blok={data.layoutStory?.content} />
        <ScrollRestoration nonce={nonce} />
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
    <I18nProvider language={data.language} translatedSlugs={translatedSlugs}>
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
  const { language } = useI18n()

  return (
    <html lang={language}>
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
  const language = getLanguageFromPath(location.pathname)

  console.error(error)

  return (
    <ErrorDoc>
      <ErrorPage
        error={error}
        errorSectionProps={{
          title: getStaticLabel('500.title', language),
          subtitle: `${getStaticLabel('500.subtitle', language)} "${
            location.pathname
          }"`,
          ctaText: getStaticLabel('500.cta', language),
        }}
      />
    </ErrorDoc>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  const location = useLocation()
  const language = getLanguageFromPath(location.pathname)

  console.error('CatchBoundary', caught)

  if (caught.status === 404) {
    return (
      <ErrorDoc>
        <ErrorPage
          errorSectionProps={{
            title: getStaticLabel('404.title', language),
            subtitle: `${getStaticLabel('404.subtitle', language)} "${
              location.pathname
            }"`,
            ctaText: getStaticLabel('404.cta', language),
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
            title: getStaticLabel('500.title', language),
            subtitle: `${getStaticLabel('500.subtitle', language)} "${
              location.pathname
            }"`,
            ctaText: getStaticLabel('500.cta', language),
          }}
        />
      </ErrorDoc>
    )
  }

  throw new Error(`Unhandled error: ${caught.status}`)
}
