// import * as React from 'react'

// import { type TranslatedSlug } from '#app/types'
// import {
//   defaultLanguage,
//   isSupportedLanguage,
//   supportedLanguages,
//   type SupportedLanguage,
// } from '#app/utils/i18n'

// type I18nContextState = {
//   language: SupportedLanguage
//   supportedLanguages: SupportedLanguage[]
//   changeLanguage: (lang: SupportedLanguage) => void
//   translatedSlugs: TranslatedSlug[]
//   isDefaultLanguage: boolean
// }

// export const I18nContext = React.createContext<I18nContextState>(
//   {} as I18nContextState,
// )

// export const useI18n = () => React.useContext(I18nContext)

// export const I18nProvider = ({
//   children,
//   language,
//   translatedSlugs = [],
// }: {
//   children: React.ReactNode
//   language: unknown
//   translatedSlugs?: TranslatedSlug[]
// }) => {
//   const [currentLanguage, setCurrentLanguage] =
//     React.useState<SupportedLanguage>(
//       isSupportedLanguage(language) ? language : defaultLanguage,
//     )

//   const changeLanguage = React.useCallback((lang: string) => {
//     if (isSupportedLanguage(lang)) {
//       setCurrentLanguage(lang)
//     }
//   }, [])

//   const value: I18nContextState = {
//     changeLanguage,
//     translatedSlugs,
//     supportedLanguages: supportedLanguages,
//     language: currentLanguage,
//     isDefaultLanguage: currentLanguage === defaultLanguage,
//   }

//   return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
// }
