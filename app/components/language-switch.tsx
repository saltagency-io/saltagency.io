import * as React from 'react'

import { useLocation, useNavigate, useRevalidator } from '@remix-run/react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Icon } from '#app/components/ui/icon.tsx'
import { defaultLanguage } from '#app/utils/i18n.ts'
import { removeTrailingSlash } from '#app/utils/misc.tsx'
import { useSlugs } from '#app/utils/providers'

export function LanguageSwitch() {
  const { t } = useTranslation()
  const { slugs } = useSlugs()
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const revalidator = useRevalidator()
  const location = useLocation()

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang)

      const slug = slugs.find(s => s.lang === lang)
      if (!slug) return

      navigate(
        removeTrailingSlash(
          lang === defaultLanguage
            ? `/${slug.path}${location.search}`
            : `/${slug.lang}/${slug.path}${location.search}`,
        ),
      )
      // Force refresh of data
      revalidator.revalidate()
    }
  }

  return (
    <div className="relative inline-block">
      <label htmlFor="lang" className="sr-only">
        {t('language.change')}
      </label>
      <select
        id="lang"
        name="language"
        value={i18n.language}
        onChange={onChange}
        className={clsx(
          'border-secondary appearance-none rounded-lg border-2 bg-transparent py-2 pl-4 pr-10 text-white',
          'focus-ring-inverse ring-offset-black focus:outline-none',
        )}
      >
        <option value="en">🇬🇧 {t('language.english')}</option>
        <option value="nl">🇳🇱 {t('language.dutch')}</option>
      </select>
      <div className="pointer-events-none absolute bottom-0 right-4 top-0 m-auto h-4 w-4 text-white">
        <Icon name="chevron-down" size="sm" className="align-top" />
      </div>
    </div>
  )
}
