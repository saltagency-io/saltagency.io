import * as React from 'react'

import { useLocation, useNavigate, useRevalidator } from '@remix-run/react'
import clsx from 'clsx'

import { IconChevronDown } from '#app/components/icons.tsx'
import { useI18n } from '#app/utils/i18n-provider.tsx'
import { defaultLanguage, isSupportedLanguage } from '#app/utils/i18n.ts'
import { useLabels } from '#app/utils/labels-provider.tsx'
import { removeTrailingSlash } from '#app/utils/misc.tsx'

export function LanguageSwitch() {
	const { t } = useLabels()
	const { language, translatedSlugs, changeLanguage } = useI18n()
	const navigate = useNavigate()
	const revalidator = useRevalidator()
	const location = useLocation()

	const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const lang = event.target.value
		if (isSupportedLanguage(lang) && lang !== language) {
			changeLanguage(lang)

			const slug = translatedSlugs.find(s => s.lang === lang)
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
				value={language}
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
				<IconChevronDown height={16} width={16} />
			</div>
		</div>
	)
}
