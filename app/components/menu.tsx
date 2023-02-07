import * as React from 'react'

export function Menu({ children }: any) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          ...child.props,
          className: 'text-white text-bold hover:underline',
        }),
      )}
    </div>
  )
}
