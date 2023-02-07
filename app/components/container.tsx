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
  return <Tag className={clsx('mx-auto max-w-7xl', className)}>{children}</Tag>
}
