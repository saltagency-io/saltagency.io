export type SupportedLanguage = 'en' | 'nl'

export const defaultLanguage: SupportedLanguage = 'en'
export const supportedLanguages: SupportedLanguage[] = ['en']

export const isSupportedLanguage = (
  lang: unknown,
): lang is SupportedLanguage => {
  return (
    typeof lang === 'string' &&
    supportedLanguages.includes(lang as SupportedLanguage)
  )
}

export function getLanguageFromContext(context: Record<string, unknown>) {
  // TODO: Restore i18n support.
  // For now we only support en, as it is the default in Storyblok.
  // Changing the default to nl is not feasible at this time.

  return defaultLanguage
  //   const { language } = context
  //   return isSupportedLanguage(language) ? language : defaultLanguage
}

export function getLanguageFromPath(path: string) {
  // TODO: Restore i18n support.
  // For now we only support en, as it is the default in Storyblok.
  // Changing the default to nl is not feasible at this time.

  return defaultLanguage

  // const [urlLang] = path.slice(1).split('/')
  // return isSupportedLanguage(urlLang) ? urlLang : defaultLanguage
}

const labels: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    '404.title': "Oh no.. it seems we've lost this page",
    '404.subtitle': "We searched everywhere but we couldn't find",
    '404.cta': 'Take me home',
    '404.more': "But wait! We're you searching for a job opening perhaps?",
    '404.careers.subtitle': "We're hiring",
    '404.careers.title':
      "We're looking for a broad spectrum of expertise to join Koodin",
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
      'We zoeken een breed spectrum aan expertise om Koodin te versterken',
    '404.meta.title': 'Niet gevonden',
    '404.meta.description':
      'Je bent op een pagina beland die we niet meer kunnen vinden 😢',
    '500.title': '500 Error, Sorry hoor!',
    '500.subtitle': 'Oeps, er is iets behoorlijk mis gegaan',
    '500.cta': 'Breng me naar huis',
  },
}

export function getStaticLabel(key: string, lang: SupportedLanguage) {
  const labelSet = labels[lang]
  if (!labelSet) return `unknown language: ${lang}`
  return labelSet[key] ?? `unknown static label key: ${key}`
}
