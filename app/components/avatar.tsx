import * as React from 'react'

import clsx from 'clsx'

type Props = {
  url: string
  alt: string
  theme: 'dark' | 'light'
  className?: string
}

export function Avatar({ url, alt, theme, className }: Props) {
  return (
    <div
      className={clsx(
        'h-16 w-16 overflow-hidden rounded-full',
        {
          'border-avatar-dark': theme === 'dark',
          'border-avatar-light': theme === 'light',
        },
        className,
      )}
    >
      <img className="rounded-full" src={url} alt={alt} />
    </div>
  )
}
