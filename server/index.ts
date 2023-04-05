import { createRequestHandler } from '@remix-run/express'

import compression from 'compression'
import crypto from 'crypto'
import express from 'express'
import 'express-async-errors'
import helmet from 'helmet'
import morgan from 'morgan'
import onFinished from 'on-finished'
import path from 'path'
import serverTiming from 'server-timing'

type SupportedLanguage = 'en' | 'nl'

const defaultLanguage: SupportedLanguage = 'en'
const supportedLanguages: SupportedLanguage[] = ['en', 'nl']

const isSupportedLanguage = (lang: unknown): lang is SupportedLanguage => {
  return (
    typeof lang === 'string' &&
    supportedLanguages.includes(lang as SupportedLanguage)
  )
}

const here = (...d: Array<string>) => path.join(__dirname, ...d)
const primaryHost = 'salt.fly.dev' // TODO: change this when we go live
const getHost = (req: { get: (key: string) => string | undefined }) =>
  req.get('X-Forwarded-Host') ?? req.get('host') ?? ''

const MODE = process.env.NODE_ENV
const BUILD_DIR = path.join(process.cwd(), 'build')

const app = express()

app.use(serverTiming())

app.use((req, res, next) => {
  res.set('X-Powered-By', 'Salt Agency')
  res.set('X-Fly-Region', process.env.FLY_REGION ?? 'unknown')
  res.set('X-Fly-App', process.env.FLY_APP_NAME ?? 'unknown')
  res.set('X-Frame-Options', 'SAMEORIGIN')

  const host = getHost(req)
  if (!host.endsWith(primaryHost)) {
    res.set('X-Robots-Tag', 'noindex')
  }

  res.set('Access-Control-Allow-Origin', `https://${host}`)
  res.set('Strict-Transport-Security', `max-age=${60 * 60 * 24 * 365 * 100}`)

  next()
})

app.use((req, res, next) => {
  const proto = req.get('X-Forwarded-Proto')
  const host = getHost(req)
  if (proto === 'http') {
    res.set('X-Forwarded-Proto', 'https')
    res.redirect(`https://${host}${req.originalUrl}`)
    return
  }
  next()
})

app.use((req, res, next) => {
  if (req.path.endsWith('/') && req.path.length > 1) {
    const query = req.url.slice(req.path.length)
    const safepath = req.path.slice(0, -1).replace(/\/+/g, '/')
    res.redirect(301, safepath + query)
  } else {
    next()
  }
})

app.use(compression())

const publicAbsolutePath = here('../public')

app.use(
  express.static(publicAbsolutePath, {
    maxAge: '1w',
    setHeaders(res, resourcePath) {
      const relativePath = resourcePath.replace(`${publicAbsolutePath}/`, '')
      if (relativePath.startsWith('build/info.json')) {
        res.setHeader('cache-control', 'no-cache')
        return
      }

      if (
        relativePath.startsWith('fonts') ||
        relativePath.startsWith('build')
      ) {
        res.setHeader('cache-control', 'public, max-age=31536000, immutable')
      }
    },
  }),
)

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

app.use(
  morgan((tokens, req, res) => {
    const host = getHost(req)
    return [
      tokens.method?.(req, res),
      `${host}${tokens.url?.(req, res)}`,
      tokens.status?.(req, res),
      tokens.res?.(req, res, 'content-length'),
      '-',
      tokens['response-time']?.(req, res),
      'ms',
    ].join(' ')
  }),
)

app.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString('hex')
  next()
})

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        'connect-src':
          MODE === 'development' ? ['ws:', "'self'"] : ["'self'", 'cdn.usefathom.com'],
        'font-src': "'self'",
        'frame-src': [
          "'self'",
          'youtube.com',
          'www.youtube.com',
          'youtu.be',
          'youtube-nocookie.com',
          'www.youtube-nocookie.com',
          '*.google.com',
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
          (req, res) => `'nonce-${res.locals.cspNonce}'`,
        ],
        'script-src-attr': ["'unsafe-inline'"],
        'upgrade-insecure-requests': null,
      },
    },
  }),
)

// i18n middleware
app.use((req, res, next) => {
  const [urlLang] = req.path.slice(1).split('/')

  if (isSupportedLanguage(urlLang)) {
    res.locals.language = urlLang
    if (urlLang === defaultLanguage) {
      const redirectTo = req.path.replace(`/${urlLang}`, '')
      res.redirect(redirectTo.startsWith('/') ? redirectTo : `/${redirectTo}`)
    }
  } else {
    const lang = req.acceptsLanguages(...supportedLanguages) || defaultLanguage
    res.locals.language = lang

    if (lang !== defaultLanguage) {
      const path = `${lang}${req.path}`
      res.redirect(path.endsWith('/') ? path.slice(0, -1) : path)
    }
  }

  next()
})

function getRequestHandlerOptions(): Parameters<
  typeof createRequestHandler
>[0] {
  const build = require('../build')
  function getLoadContext(req: any, res: any) {
    return {
      cspNonce: res.locals.cspNonce,
      language: res.locals.language,
    }
  }
  return { build, mode: MODE, getLoadContext }
}

function purgeRequireCache() {
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key]
    }
  }
}

if (MODE === 'production') {
  app.all('*', createRequestHandler(getRequestHandlerOptions()))
} else {
  app.all('*', (req, res, next) => {
    purgeRequireCache()
    return createRequestHandler(getRequestHandlerOptions())(req, res, next)
  })
}

// const server = https.createServer(
//   {
//     cert: fs.readFileSync(here('../localhost.pem')),
//     key: fs.readFileSync(here('../localhost-key.pem')),
//   },
//   app,
// )

const port = process.env.PORT ?? 3000
app.listen(port, () => {
  require('../build')
  console.log(`Express server started on http://localhost:${port}`)
})
