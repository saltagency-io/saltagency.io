import type * as React from 'react'

import clsx from 'clsx'

import { IconChevronDown } from '~/components/icons'
import { isSupportedLanguage } from '~/utils/i18n'
import { useI18n } from '~/utils/i18n-provider'
import { useLabels } from '~/utils/labels-provider'

export function LanguageSwitch() {
  const { t } = useLabels()
  const { language, changeLanguage } = useI18n()

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    if (isSupportedLanguage(value)) {
      changeLanguage(value)
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
          'appearance-none rounded-lg border-2 border-secondary bg-transparent py-2 pr-10 pl-4 text-white',
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
