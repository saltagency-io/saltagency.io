import * as React from 'react'

import clsx from 'clsx'

import { getImgProps } from '~/utils/images'

type Props = {
  url: string
  alt: string
  theme?: 'dark' | 'light' | 'white' | 'gray'
  size?: 'small' | 'large'
  className?: string
}

export function Avatar({
  url,
  alt,
  theme = 'dark',
  size = 'large',
  className,
}: Props) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center overflow-hidden rounded-full border-8',
        {
          'h-10 w-10 border-4': size === 'small',
          'h-16 w-16 border-8': size === 'large',
          'border-avatar-dark': theme === 'dark',
          'border-avatar-light': theme === 'light',
          'border-white': theme === 'white',
          'border-gray-body': theme === 'gray',
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
