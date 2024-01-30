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
import isbot from 'isbot'
import { renderToPipeableStream } from 'react-dom/server'

import { getEnv, init } from './utils/env.server.ts'
import { I18nProvider } from './utils/i18n-provider.tsx'
import { defaultLanguage, isSupportedLanguage } from './utils/i18n.ts'
import { NonceProvider } from './utils/nonce-provider.tsx'

const ABORT_DELAY = 5_000

init()
global.ENV = getEnv()

if (ENV.MODE === 'production' && ENV.SENTRY_DSN) {
  import('./utils/monitoring.server.ts').then(({ init }) => init())
}

export default function handleRequest(
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
  const language = isSupportedLanguage(loadContext.language)
    ? loadContext.language
    : defaultLanguage

  return new Promise(async (resolve, reject) => {
    let didError = false
    const { pipe, abort } = renderToPipeableStream(
      <NonceProvider value={nonce}>
        <I18nProvider language={language}>
          <RemixServer context={remixContext} url={request.url} />
        </I18nProvider>
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
