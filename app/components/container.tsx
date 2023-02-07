// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type * as React from 'react'

import clsx from 'clsx'

export function Container({
  children,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}) {
  return (
    <Tag className="max-w-7xl lg:mx-auto">
      <div className={clsx('relative mx-10vw', className)}>{children}</div>
    </Tag>
  )
}
