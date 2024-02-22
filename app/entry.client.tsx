import { startTransition } from 'react'

import { RemixBrowser } from '@remix-run/react'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { hydrateRoot } from 'react-dom/client'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { getInitialNamespaces } from 'remix-i18next'

import i18n from '#app/utils/i18n.ts'

if (ENV.MODE === 'production' && ENV.SENTRY_DSN) {
  import('./utils/monitoring.client.ts').then(({ init }) => init())
}

await i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    ...i18n,
    ns: getInitialNamespaces(),
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
    detection: {
      order: ['htmlTag'],
      caches: [],
    },
  })

startTransition(() => {
  hydrateRoot(
    document,
    <I18nextProvider i18n={i18next}>
      <RemixBrowser />
    </I18nextProvider>,
  )
})
