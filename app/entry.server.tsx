import type { HandleDocumentRequestFunction } from '@remix-run/node'
import { Response } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'

import isbot from 'isbot'
import { renderToPipeableStream } from 'react-dom/server'
import { PassThrough } from 'stream'

import { routes as otherRoutes } from '~/other-routes.server'
import { getEnv } from '~/utils/env.server'
import { NonceProvider } from '~/utils/nonce-provider'

global.ENV = getEnv()

const ABORT_DELAY = 5000

// https://github.com/remix-run/remix/discussions/4603
type DocRequestArgs = Parameters<HandleDocumentRequestFunction>

export default async function handleRequest(...args: DocRequestArgs) {
  const [
    request,
    responseStatusCode,
    responseHeaders,
    remixContext,
    loadContext,
  ] = args

  for (const handler of otherRoutes) {
    const otherRouteResponse = await handler(request, remixContext)
    if (otherRouteResponse) return otherRouteResponse
  }

  if (process.env.NODE_ENV !== 'production') {
    responseHeaders.set('Cache-Control', 'no-store')
  }

  // Preconnect to storyblok domains (image and script locations)
  responseHeaders.append('Link', '<https://a.storyblok.com>; rel="preconnect"')
  responseHeaders.append(
    'Link',
    '<https://app.storyblok.com>; rel="preconnect"',
  )

  if (isbot(request.headers.get('user-agent'))) {
    return handleBotRequest(
      request,
      responseStatusCode,
      responseHeaders,
      remixContext,
      loadContext,
    )
  }

  return handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext,
    loadContext,
  )
}

function handleBotRequest(...args: DocRequestArgs) {
  const [
    request,
    responseStatusCode,
    responseHeaders,
    remixContext,
    loadContext,
  ] = args

  const nonce = loadContext.cspNonce ? String(loadContext.cspNonce) : undefined

  return new Promise((resolve, reject) => {
    let didError = false

    const { pipe, abort } = renderToPipeableStream(
      <NonceProvider value={nonce}>
        <RemixServer context={remixContext} url={request.url} />
      </NonceProvider>,
      {
        nonce,
        onAllReady() {
          const body = new PassThrough()

          responseHeaders.set('Content-Type', 'text/html')

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          )

          pipe(body)
        },
        onShellError(error: unknown) {
          reject(error)
        },
        onError(error: unknown) {
          didError = true

          console.error(error)
        },
      },
    )

    setTimeout(abort, ABORT_DELAY)
  })
}

function handleBrowserRequest(...args: DocRequestArgs) {
  const [
    request,
    responseStatusCode,
    responseHeaders,
    remixContext,
    loadContext,
  ] = args

  const nonce = loadContext.cspNonce ? String(loadContext.cspNonce) : undefined

  return new Promise((resolve, reject) => {
    let didError = false

    const { pipe, abort } = renderToPipeableStream(
      <NonceProvider value={nonce}>
        <RemixServer
          context={remixContext}
          url={request.url}
          abortDelay={ABORT_DELAY}
        />
      </NonceProvider>,
      {
        nonce,
        onShellReady() {
          const body = new PassThrough()

          responseHeaders.set('Content-Type', 'text/html')

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          )

          pipe(body)
        },
        onShellError(err: unknown) {
          reject(err)
        },
        onError(error: unknown) {
          didError = true

          console.error(error)
        },
      },
    )

    setTimeout(abort, ABORT_DELAY)
  })
}
