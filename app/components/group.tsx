import clsx from 'clsx'

import { DecoratedBackground } from './decorated-background'
import type { GroupTheme } from '~/types'
import { GroupProvider } from '~/utils/providers'

type Props = {
  theme: GroupTheme
}

const backgroundColorStyles: Record<GroupTheme, string> = {
  'dark-decorated': 'bg-black/80',
  dark: 'bg-black/80',
  'light-gray': 'bg-gray-body',
  'light-gray-decorated': 'bg-gray-body',
  'light-hero': 'bg-transparent',
  'light-white': 'bg-white',
  'dark-to-footer': 'bg-gradient',
}
export function Group({ theme, children }: React.PropsWithChildren<Props>) {
  return (
    <GroupProvider value={{ theme }}>
      <section
        className={clsx(
          'relative flex flex-col gap-20 py-20 lg:gap-40 lg:py-40',
          backgroundColorStyles[theme],
        )}
      >
        {theme === 'dark-decorated' && <DecoratedBackground />}
        {children}
      </section>
    </GroupProvider>
  )
}
