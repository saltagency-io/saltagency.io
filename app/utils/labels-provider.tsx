import * as React from 'react'

import type { DataSourceEntry } from '~/types'

type Options = {
	replace?: boolean
}

const LabelsContext = React.createContext<{
	t: (key: string, opts?: Options) => string
	to: (key: string | null | undefined) => string | undefined
}>({
	t: key => key,
	to: key => `${key}`,
})

LabelsContext.displayName = 'LabelsContext'

function parseLink(label: string) {
	const regex = /[\[]{1}([^\]\[]+)[\]]{1}[(]{1}([^()"]+)("(.+)")?[)]{1}/g
	return label.replace(
		regex,
		'<a class="underlined active focus:text-white" href="$2" title="$4">$1</a>',
	)
}

export function LabelsProvider({
	children,
	data,
}: {
	children: React.ReactNode
	data: DataSourceEntry[] | undefined
}) {
	const labels = (data || []).reduce<Record<string, string>>(
		(result, entry) => ({
			...result,
			[entry.name]: entry.dimension_value || entry.value,
		}),
		{},
	)

	const translate = React.useCallback(
		(key: string, opts: Options = {}) => {
			const label = labels[key] ?? `unknown:${key}`
			if (opts.replace) {
				return parseLink(label)
			}
			return label
		},
		[labels],
	)

	const translateOptional = React.useCallback(
		(key: string | undefined | null) => {
			if (!key) return
			return labels[key]
		},
		[labels],
	)

	return (
		<LabelsContext.Provider value={{ t: translate, to: translateOptional }}>
			{children}
		</LabelsContext.Provider>
	)
}

export function useLabels() {
	const value = React.useContext(LabelsContext)
	if (!value) {
		throw new Error('You need to wrap your component in LabelProvider')
	}
	return value
}
