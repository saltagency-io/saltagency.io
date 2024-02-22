import { resolve } from 'node:path'
import { PassThrough } from 'node:stream'

import {
  createReadableStreamFromReadable,
  type ActionFunctionArgs,
  type AppLoadContext,
  type EntryContext,
  type LoaderFunctionArgs,
} from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import * as Sentry from '@sentry/remix'
import { createInstance } from 'i18next'
import Backend from 'i18next-fs-backend'
import { isbot } from 'isbot'
import { renderToPipeableStream } from 'react-dom/server'
import { I18nextProvider, initReactI18next } from 'react-i18next'

import { getEnv, init } from './utils/env.server.ts'
import i18n, { getLocaleFromRequest } from './utils/i18n.ts'
import { i18next } from './utils/i18next.server.ts'
import { NonceProvider } from './utils/nonce-provider.tsx'

const ABORT_DELAY = 5_000

init()
global.ENV = getEnv()

if (ENV.MODE === 'production' && ENV.SENTRY_DSN) {
  import('./utils/monitoring.server.ts').then(({ init }) => init())
}

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext,
) {
  responseHeaders.set('fly-region', process.env.FLY_REGION ?? 'unknown')
  responseHeaders.set('fly-app', process.env.FLY_APP_NAME ?? 'unknown')

  // Preconnect to storyblok domains (image and script locations)
  responseHeaders.append('Link', '<https://a.storyblok.com>; rel="preconnect"')
  responseHeaders.append(
    'Link',
    '<https://app.storyblok.com>; rel="preconnect"',
  )

  const callbackName = isbot(request.headers.get('user-agent'))
    ? 'onAllReady'
    : 'onShellReady'

  const nonce = String(loadContext.cspNonce) ?? undefined

  const i18nInstance = createInstance()
  const lng = getLocaleFromRequest(request)
  const ns = i18next.getRouteNamespaces(remixContext)

  await i18nInstance
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18n,
      lng,
      ns,
      backend: { loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json') },
    })

  return new Promise(async (resolve, reject) => {
    let didError = false
    const { pipe, abort } = renderToPipeableStream(
      <NonceProvider value={nonce}>
        <I18nextProvider i18n={i18nInstance}>
          <RemixServer context={remixContext} url={request.url} />
        </I18nextProvider>
      </NonceProvider>,
      {
        [callbackName]: () => {
          const body = new PassThrough()
          responseHeaders.set('Content-Type', 'text/html')
          resolve(
            new Response(createReadableStreamFromReadable(body), {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          )
          pipe(body)
        },
        onShellError: (error: unknown) => {
          reject(error)
        },
        onError: (error: unknown) => {
          didError = true

          console.error(error)
        },
        nonce,
      },
    )

    setTimeout(abort, ABORT_DELAY)
  })
}

export function handleError(
  error: unknown,
  { request }: LoaderFunctionArgs | ActionFunctionArgs,
): void {
  if (error instanceof Error) {
    Sentry.captureRemixServerException(error, 'remix.server', request)
  } else {
    Sentry.captureException(error)
  }
}
