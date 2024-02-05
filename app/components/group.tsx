import type { GroupTheme } from '~/types'
import { GroupProvider } from '~/utils/providers'
import clsx from 'clsx'

import {
  DecoratedBackgroundDark,
  DecoratedBackgroundHero,
} from './decorated-background'

type Props = {
  hasComponentSpacing?: boolean
  theme: GroupTheme
}

const backgroundColorStyles: Record<GroupTheme, string> = {
  'dark-decorated': 'bg-black/80',
  dark: 'bg-black/80',
  'light-gray': 'bg-transparent',
  'light-gray-decorated': 'bg-transparent',
  'light-white': 'bg-white',
  'dark-to-footer': 'bg-gradient',
}
export function Group({
  theme,
  hasComponentSpacing,
  children,
}: React.PropsWithChildren<Props>) {
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
