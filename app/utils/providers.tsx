import * as React from 'react'

import type { StoryData } from '@storyblok/react'
import type { GroupTheme, VacancyStoryContent } from '~/types'

export function createSimpleContext<ContextType>(name: string) {
	const defaultValue = Symbol(`Default ${name} context value`)
	const Context = React.createContext<ContextType | null | typeof defaultValue>(
		defaultValue,
	)
	Context.displayName = name

	function useValue() {
		const value = React.useContext(Context)
		if (value === defaultValue) {
			throw new Error(`use${name} must be used within ${name}Provider`)
		}
		if (!value) {
			throw new Error(
				`No value in ${name}Provider context. If the value is optional in this situation, try useOptional${name} instead of use${name}`,
			)
		}
		return value
	}

	function useOptionalValue() {
		const value = React.useContext(Context)
		if (value === defaultValue) {
			throw new Error(`useOptional${name} must be used within ${name}Provider`)
		}
		return value
	}

	return { Provider: Context.Provider, useValue, useOptionalValue }
}

type PreviewState = {
	preview: boolean
}

const { Provider: PreviewStateProvider, useValue: usePreviewState } =
	createSimpleContext<PreviewState>('PreviewContext')

export { PreviewStateProvider, usePreviewState }

type VacanciesState = {
	vacancies: StoryData<VacancyStoryContent>[]
}

const { Provider: VacanciesProvider, useValue: useVacancies } =
	createSimpleContext<VacanciesState>('VacanciesContext')

export { VacanciesProvider, useVacancies }

type GroupState = {
	theme: GroupTheme
}

const { Provider: GroupProvider, useValue: useGroup } =
	createSimpleContext<GroupState>('GroupContext')

export { GroupProvider, useGroup }
