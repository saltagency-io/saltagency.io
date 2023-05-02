export type SupportedLocale = 'en' | 'nl'

export const defaultLocale: SupportedLocale = 'en'
export const supportedLocales: SupportedLocale[] = ['en', 'nl']

export const isSupportedLocale = (locale: unknown): locale is SupportedLocale => {
  return (
    typeof locale === 'string' &&
    supportedLocales.includes(locale as SupportedLocale)
  )
}

export function getLocaleFromContext(context: Record<string, unknown>) {
  const { locale } = context
  return isSupportedLocale(locale) ? locale : defaultLocale
}

export function getLocaleFromPath(path: string) {
  const [urlLang] = path.slice(1).split('/')
  return isSupportedLocale(urlLang) ? urlLang : defaultLocale
}

const labels: Record<SupportedLocale, Record<string, string>> = {
  en: {
    '404.title': "Oh no.. it seems we've lost this page",
    '404.subtitle': "We searched everywhere but we couldn't find",
    '404.cta': 'Take me home',
    '404.more': "But wait! We're you searching for a job opening perhaps?",
    '404.careers.subtitle': "We're hiring",
    '404.careers.title':
      "We're looking for a broad spectrum of expertise to join Salt",
    '404.meta.title': 'Not found',
    '404.meta.description': 'You landed on a page that we could not find 😢',
    '500.title': '500 Error, Sorry about that!',
    '500.subtitle': 'Oops, something went terribly wrong on',
    '500.cta': 'Take me home',
  },
  nl: {
    '404.title': 'Oeps.. het lijkt er op dat we deze pagina verloren zijn',
    '404.subtitle':
      'We hebben over al gezocht, maar kunnen de pagina niet vinden die hoort bij',
    '404.cta': 'Breng me naar huis',
    '404.more': 'Maar wacht even! Zocht je misschien naar een vacature?',
    '404.careers.subtitle': 'Wij zijn op zoek',
    '404.careers.title':
      'We zoeken een breed spectrum aan expertise om Salt te versterken',
    '404.meta.title': 'Niet gevonden',
    '404.meta.description':
      'Je bent op een pagina beland die we niet meer kunnen vinden 😢',
    '500.title': '500 Error, Sorry hoor!',
    '500.subtitle': 'Oeps, er is iets behoorlijk mis gegaan',
    '500.cta': 'Breng me naar huis',
  },
}

export function getStaticLabel(key: string, locale: SupportedLocale) {
  const labelSet = labels[locale]
  if (!labelSet) return `unknown locale: ${locale}`
  return labelSet[key] ?? `unknown static label key: ${key}`
}
