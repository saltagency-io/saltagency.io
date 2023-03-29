import type * as React from 'react'

import { useLocation, useNavigate, useRevalidator } from '@remix-run/react'

import clsx from 'clsx'

import { IconChevronDown } from '~/components/icons'
import { defaultLanguage, isSupportedLanguage } from '~/utils/i18n'
import { useI18n } from '~/utils/i18n-provider'
import { useLabels } from '~/utils/labels-provider'
import { removeTrailingSlash } from '~/utils/misc'

export function LanguageSwitch() {
  const { t } = useLabels()
  const { language, translatedSlugs, changeLanguage } = useI18n()
  const navigate = useNavigate()
  const revalidator = useRevalidator()
  const location = useLocation()

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value
    if (isSupportedLanguage(lang)) {
      changeLanguage(lang)

      const slug = translatedSlugs.find((s) => s.lang === lang)
      if (!slug) return

      navigate(
        removeTrailingSlash(
          lang === defaultLanguage
            ? `/${slug.path}${location.search}`
            : `/${slug.lang}/${slug.path}${location.search}`,
        ),
      )
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
        value={language}
        onChange={onChange}
        className={clsx(
          'border-secondary appearance-none rounded-lg border-2 bg-transparent py-2 pr-10 pl-4 text-white',
          'focus-ring-inverse ring-offset-black focus:outline-none',
        )}
      >
        <option value="en">🇬🇧 {t('language.english')}</option>
        <option value="nl">🇳🇱 {t('language.dutch')}</option>
      </select>
      <div className="pointer-events-none absolute top-0 right-4 bottom-0 m-auto h-4 w-4 text-white">
        <IconChevronDown height={16} width={16} />
      </div>
    </div>
  )
}
