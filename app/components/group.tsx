import * as React from 'react'

import clsx from 'clsx'

import {
  DecoratedBackgroundDark,
  DecoratedBackgroundHero,
} from '#app/components/decorated-background.tsx'
import { type GroupTheme } from '#app/types.ts'
import { GroupProvider } from '#app/utils/providers.tsx'

type Props = {
  hasComponentSpacing?: boolean
  theme: GroupTheme
  children: React.ReactNode
}

const backgroundColorStyles: Record<GroupTheme, string> = {
  'dark-decorated': 'bg-black/80',
  dark: 'bg-black/80',
  'light-gray': 'bg-transparent',
  'light-gray-decorated': 'bg-transparent',
  'light-white': 'bg-white',
  'dark-to-footer': 'bg-gradient',
}

export function Group({ theme, hasComponentSpacing, children }: Props) {
  return (
    <GroupProvider value={{ theme }}>
      <section
        className={clsx(
          !hasComponentSpacing ? '' : 'gap-20 lg:gap-40',
          'relative flex flex-col py-20 lg:py-40',
          backgroundColorStyles[theme],
        )}
      >
        {theme === 'dark-decorated' && <DecoratedBackgroundDark />}
        {theme === 'light-gray-decorated' && <DecoratedBackgroundHero />}
        {children}
      </section>
    </GroupProvider>
  )
}
