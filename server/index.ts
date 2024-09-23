import crypto from 'crypto'
import path from 'path'
import { fileURLToPath } from 'url'

import { createRequestHandler as _createRequestHandler } from '@remix-run/express'
import { installGlobals, type ServerBuild } from '@remix-run/node'
import * as Sentry from '@sentry/remix'
import { ip as ipAddress } from 'address'
import chalk from 'chalk'
import closeWithGrace from 'close-with-grace'
import compression from 'compression'
import express from 'express'
import rateLimit from 'express-rate-limit'
import getPort, { portNumbers } from 'get-port'
import helmet from 'helmet'
import morgan from 'morgan'
import onFinished from 'on-finished'

installGlobals()

const MODE = process.env.NODE_ENV ?? 'development'

const createRequestHandler =
  MODE === 'production'
    ? Sentry.wrapExpressCreateRequestHandler(_createRequestHandler)
    : _createRequestHandler

const viteDevServer =
  MODE === 'production'
    ? undefined
    : await import('vite').then(vite =>
        vite.createServer({
          server: { middlewareMode: true },
        }),
      )

const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const here = (...d: Array<string>) => path.join(__dirname, ...d)
const getHost = (req: { get: (key: string) => string | undefined }) =>
  req.get('X-Forwarded-Host') ?? req.get('host') ?? ''

// fly is our proxy
app.set('trust proxy', true)

// Setup headers
app.use((req, res, next) => {
  res.set('X-Powered-By', 'Koodin')
  res.set('X-Fly-Region', process.env.FLY_REGION ?? 'unknown')
  res.set('X-Fly-App', process.env.FLY_APP_NAME ?? 'unknown')
  res.set('X-Frame-Options', 'SAMEORIGIN')

  const host = getHost(req)
  if (host.endsWith('.fly.dev')) {
    res.set('X-Robots-Tag', 'noindex')
  }

  res.set('Access-Control-Allow-Origin', `https://${host}`)
  res.set('Strict-Transport-Security', `max-age=${60 * 60 * 24 * 365 * 100}`)

  next()
})

// Forward HTTP to HTTPS
app.use((req, res, next) => {
  const proto = req.get('X-Forwarded-Proto')
  const host = getHost(req)
  if (proto === 'http') {
    res.set('X-Forwarded-Proto', 'https')
    return res.redirect(`https://${host}${req.originalUrl}`)
  }
  next()
})

// Redirect www to non-www
app.use((req, res, next) => {
  const host = getHost(req)
  if (host.startsWith('www.')) {
    const newHost = host.slice(4)
    app.set('trust proxy', true)
    return res.redirect(302, `${req.protocol}://${newHost}${req.originalUrl}`)
  }
  next()
})

// No ending slash in urls
app.use((req, res, next) => {
  if (req.path.endsWith('/') && req.path.length > 1) {
    const query = req.url.slice(req.path.length)
    const safepath = req.path.slice(0, -1).replace(/\/+/g, '/')
    res.redirect(301, safepath + query)
  } else {
    next()
  }
})

app.disable('x-powered-by')

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

const publicAbsolutePath = here('../build/client')

app.use(compression())

if (viteDevServer) {
  app.use(viteDevServer.middlewares)
} else {
  app.use(
    express.static(publicAbsolutePath, {
      maxAge: '1w',
      setHeaders(res, resourcePath) {
        const relativePath = resourcePath.replace(`${publicAbsolutePath}/`, '')
        if (relativePath.startsWith('build/info.json')) {
          res.setHeader('cache-control', 'no-cache')
          return
        }
        // If we ever change our font (which we quite possibly never will)
        // then we'll just want to change the filename or something...
        // Remix fingerprints its assets so we can cache forever
        if (
          relativePath.startsWith('fonts') ||
          relativePath.startsWith('build')
        ) {
          res.setHeader('cache-control', 'public, max-age=31536000, immutable')
        }
      },
    }),
  )
}

app.get(['/build/*', '/images/*', '/fonts/*', '/favicons/*'], (req, res) => {
  // if we made it past the express.static for these, then we're missing something.
  // So we'll just send a 404 and won't bother calling other middleware.
  return res.status(404).send('Not found')
})

// Log the referrer for 404s
app.use((req, res, next) => {
  onFinished(res, () => {
    const referrer = req.get('referer')
    if (res.statusCode === 404 && referrer) {
      console.info(
        `👻 404 on ${req.method} ${req.path} referred by: ${referrer}`,
      )
    }
  })
  next()
})

// Setup morgan logger
morgan.token('url', req => decodeURIComponent(req.url ?? ''))
app.use(
  morgan('tiny', {
    skip: (req, res) =>
      res.statusCode === 200 && req.url?.startsWith('/resources/healthcheck'),
  }),
)

// Add csp nonce
app.use((_, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString('hex')
  next()
})

// Setup csp using helmet
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        'connect-src': [
          MODE === 'development' ? 'ws:' : null,
          process.env.SENTRY_DSN ? '*.ingest.sentry.io' : null,
          'cdn.usefathom.com',
          "'self'",
        ].filter((s): s is string => s !== null),
        'font-src': ["'self'"],
        'frame-src': [
          "'self'",
          'youtube.com',
          'www.youtube.com',
          'youtu.be',
          'youtube-nocookie.com',
          'www.youtube-nocookie.com',
        ],
        'frame-ancestors': ["'self'", 'app.storyblok.com'],
        'img-src': ["'self'", 'data:', 'a.storyblok.com', 'cdn.usefathom.com'],
        'media-src': ["'self'", 'a.storyblok.com', 'data:', 'blob:'],
        'script-src': [
          "'strict-dynamic'",
          "'unsafe-eval'",
          "'self'",
          'app.storyblok.com',
          'cdn.usefathom.com',
          // @ts-expect-error locals doesn't exist on helmet's Response type
          (_, res) => `'nonce-${res.locals.cspNonce}'`,
        ],
        'script-src-attr': [
          (_, res) =>
            // @ts-expect-error
            `'nonce-${res.locals.cspNonce}'`,
        ],
        'upgrade-insecure-requests': null,
      },
    },
  }),
)

// When running tests or running in development, we want to effectively disable
// rate limiting because playwright tests are very fast and we don't want to
// have to wait for the rate limit to reset between tests.
const maxMultiple =
  MODE !== 'production' || process.env.PLAYWRIGHT_TEST_BASE_URL ? 10_000 : 1
const rateLimitDefault = {
  windowMs: 60 * 1000,
  max: 1000 * maxMultiple,
  standardHeaders: true,
  legacyHeaders: false,
  // Fly.io prevents spoofing of X-Forwarded-For
  // so no need to validate the trustProxy config
  validate: { trustProxy: false },
}

const strongestRateLimit = rateLimit({
  ...rateLimitDefault,
  windowMs: 60 * 1000,
  max: 10 * maxMultiple,
})

const strongRateLimit = rateLimit({
  ...rateLimitDefault,
  windowMs: 60 * 1000,
  max: 100 * maxMultiple,
})

const generalRateLimit = rateLimit(rateLimitDefault)
app.use((req, res, next) => {
  const strongPaths = [
    '/login',
    '/signup',
    '/verify',
    '/admin',
    '/onboarding',
    '/reset-password',
    '/settings/profile',
    '/resources/login',
    '/resources/verify',
  ]
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (strongPaths.some(p => req.path.includes(p))) {
      return strongestRateLimit(req, res, next)
    }
    return strongRateLimit(req, res, next)
  }

  // the verify route is a special case because it's a GET route that
  // can have a token in the query string
  if (req.path.includes('/verify')) {
    return strongestRateLimit(req, res, next)
  }

  return generalRateLimit(req, res, next)
})

async function getBuild() {
  const build = viteDevServer
    ? viteDevServer.ssrLoadModule('virtual:remix/server-build')
    : // @ts-ignore this should exist before running the server
      // but it may not exist just yet.
      await import('#build/server/index.js')
  // not sure how to make this happy 🤷‍♂️
  return build as unknown as ServerBuild
}

app.all(
  '*',
  createRequestHandler({
    getLoadContext: (_: any, res: any) => ({
      cspNonce: res.locals.cspNonce,
      serverBuild: getBuild(),
    }),
    mode: MODE,
    // @sentry/remix needs to be updated to handle the function signature
    build: MODE === 'production' ? await getBuild() : getBuild,
  }),
)

const desiredPort = Number(process.env.PORT || 3000)
const portToUse = await getPort({
  port: portNumbers(desiredPort, desiredPort + 100),
})

const server = app.listen(portToUse, () => {
  const addy = server.address()
  const portUsed =
    desiredPort === portToUse
      ? desiredPort
      : addy && typeof addy === 'object'
        ? addy.port
        : 0

  if (portUsed !== desiredPort) {
    console.warn(
      chalk.yellow(
        `⚠️  Port ${desiredPort} is not available, using ${portUsed} instead.`,
      ),
    )
  }
  console.log(`🚀  We have liftoff!`)
  const localUrl = `http://localhost:${portUsed}`
  let lanUrl: string | null = null
  const localIp = ipAddress() ?? 'Unknown'
  // Check if the address is a private ip
  // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
  // https://github.com/facebook/create-react-app/blob/d960b9e38c062584ff6cfb1a70e1512509a966e7/packages/react-dev-utils/WebpackDevServerUtils.js#LL48C9-L54C10
  if (/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(localIp)) {
    lanUrl = `http://${localIp}:${portUsed}`
  }

  console.log(
    `
${chalk.bold('Local:')}            ${chalk.cyan(localUrl)}
${lanUrl ? `${chalk.bold('On Your Network:')}  ${chalk.cyan(lanUrl)}` : ''}
${chalk.bold('Press Ctrl+C to stop')}
		`.trim(),
  )
})

closeWithGrace(async () => {
  await new Promise((resolve, reject) => {
    server.close(e => (e ? reject(e) : resolve('ok')))
  })
})
