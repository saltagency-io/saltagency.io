import type * as React from 'react'

import {
  useFetcher,
  useLocation,
  useNavigate,
  useRevalidator,
} from '@remix-run/react'

import clsx from 'clsx'

import { IconChevronDown } from '~/components/icons'
import { defaultLocale, isSupportedLocale, SupportedLocale } from '~/utils/i18n'
import { useI18n } from '~/utils/i18n-provider'
import { useLabels } from '~/utils/labels-provider'
import { removeTrailingSlash } from '~/utils/misc'

export function LocaleSwitch() {
  const { t } = useLabels()
  const fetcher = useFetcher()
  const { locale, translatedSlugs, updateLocale } = useI18n()
  const navigate = useNavigate()
  const revalidator = useRevalidator()
  const location = useLocation()

  const changeLocale = async (newLocale: SupportedLocale) => {
    fetcher.submit(
      { locale: newLocale },
      { action: '/action/set-locale', method: 'post' },
    )
    updateLocale(newLocale)
  }

  const onChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value
    if (isSupportedLocale(newLocale)) {
      await changeLocale(newLocale)

      const slug = translatedSlugs.find((s) => s.lang === newLocale)

      if (!slug) return

      navigate(
        removeTrailingSlash(
          newLocale === defaultLocale
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
      <label htmlFor="locale" className="sr-only">
        {t('language.change')}
      </label>
      <select
        id="locale"
        name="locale"
        value={locale}
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
