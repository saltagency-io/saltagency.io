import * as React from 'react'

import { type ISbStoryData as StoryData } from '@storyblok/react'

import {
  type GroupTheme,
  type StoryPostContent,
  type TranslatedSlug,
  type VacancyStoryContent,
} from '#app/types.ts'

// Context factory
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

// Preview provider
type PreviewState = {
  preview: boolean
}

const { Provider: PreviewStateProvider, useValue: usePreviewState } =
  createSimpleContext<PreviewState>('PreviewContext')

export { PreviewStateProvider, usePreviewState }

// Vacancies provider
type VacanciesState = {
  vacancies: StoryData<VacancyStoryContent>[]
}

const { Provider: VacanciesProvider, useValue: useVacancies } =
  createSimpleContext<VacanciesState>('VacanciesContext')

export { VacanciesProvider, useVacancies }

// Stories provider
type StoriesState = {
  stories: StoryData<StoryPostContent>[]
}

const { Provider: StoriesProvider, useValue: useStories } =
  createSimpleContext<StoriesState>('StoriesContext')

export { StoriesProvider, useStories }

// Group provider
type GroupState = {
  theme: GroupTheme
}

const { Provider: GroupProvider, useValue: useGroup } =
  createSimpleContext<GroupState>('GroupContext')

export { GroupProvider, useGroup }

// Slugs provider
type SlugsState = {
  slugs: TranslatedSlug[]
}

export const { Provider: SlugsProvider, useValue: useSlugs } =
  createSimpleContext<SlugsState>('SlugsContext')
