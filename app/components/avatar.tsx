import * as React from 'react'

import clsx from 'clsx'

type Props = {
  url: string
  alt: string
  theme?: 'dark' | 'light' | 'white'
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
        'overflow-hidden rounded-full border-8',
        {
          'h-10 w-10 border-4': size === 'small',
          'h-16 w-16 border-8': size === 'large',
          'border-avatar-dark': theme === 'dark',
          'border-avatar-light': theme === 'light',
          'border-white': theme === 'white',
        },
        className,
      )}
    >
      <img className="rounded-full" src={url} alt={alt} />
    </div>
  )
}
