import clsx from 'clsx'
import type { GroupTheme } from 'types'

import { getImgProps } from '~/utils/images'

type Props = {
  url: string
  alt: string
  size?: 'small' | 'large'
  className?: string
  theme: GroupTheme
}

export function Avatar({ url, alt, size = 'large', theme, className }: Props) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center overflow-hidden rounded-full border',
        {
          'h-14 w-14 border-4': size === 'small',
          'h-16 w-16 border-8': size === 'large',
          'border-avatar-dark': theme.startsWith('dark'),
          'border-white': theme === 'light-white',
          'border-gray-50': theme.startsWith('light-gray'),
        },
        className,
      )}
    >
      <img
        className="aspect-square h-full w-full rounded-full object-cover"
        {...getImgProps(url, alt, {
          widths: [96],
          sizes: ['96px'],
          transformations: {
            quality: 100,
          },
        })}
      />
    </div>
  )
}
