import * as React from 'react'

import clsx from 'clsx'

export function Menu({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={clsx('flex flex-col gap-2 lg:flex-row lg:gap-8', className)}
    >
      {React.Children.map(children, (child) => {
        return React.isValidElement(child)
          ? React.cloneElement(child, {
              ...child.props,
              className: 'text-white text-bold hover:underline',
            })
          : null
      })}
    </div>
  )
}
