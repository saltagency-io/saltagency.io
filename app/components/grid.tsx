import * as React from 'react'

import clsx from 'clsx'

interface GridProps {
  children: React.ReactNode
  overflow?: boolean
  className?: string
  as?: React.ElementType
  nested?: boolean
  rowGap?: boolean
}

export const Grid = React.forwardRef<HTMLElement, GridProps>(function Grid(
  { children, className, as: Tag = 'div', nested, rowGap },
  ref,
) {
  return (
    <Tag
      ref={ref}
      className={clsx('relative', {
        'mx-4 md:mx-8vw': !nested,
        'w-full': nested,
      })}
    >
      <div
        className={clsx(
          'relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6',
          {
            'mx-auto max-w-5xl': !nested,
            'gap-y-4 lg:gap-y-6': rowGap,
          },
          className,
        )}
      >
        {children}
      </div>
    </Tag>
  )
})
