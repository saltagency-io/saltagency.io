export type SupportedLanguage = 'en' | 'nl'

export const defaultLanguage: SupportedLanguage = 'en'
export const supportedLanguages: SupportedLanguage[] = ['en', 'nl']

export const isSupportedLanguage = (
  lang: unknown,
): lang is SupportedLanguage => {
  return (
    typeof lang === 'string' &&
    supportedLanguages.includes(lang as SupportedLanguage)
  )
}

export function getLanguageFromContext(context: Record<string, unknown>) {
  const { language } = context
  return isSupportedLanguage(language) ? language : defaultLanguage
}
