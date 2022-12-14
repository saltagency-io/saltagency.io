// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type * as React from 'react'

import clsx from 'clsx'

export function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={clsx('max-w-7xl mx-auto', className)}>{children}</div>
}
