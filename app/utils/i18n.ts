export const supportedLanguages = ['nl', 'en']
export const defaultLanguage = 'nl'

export default {
  supportLngs: supportedLanguages,
  fallbackLng: defaultLanguage,
  defaultNS: 'common',
  react: { useSuspense: false },
}

export function isSupportedLocale(locale: string) {
  return typeof locale === 'string' && supportedLanguages.includes(locale)
}

export function getLocaleFromRequest(request: Request) {
  const { pathname } = new URL(request.url)
  const [locale] = pathname.slice(1).split('/')
  return isSupportedLocale(locale) ? locale : defaultLanguage
}
