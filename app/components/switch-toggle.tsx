import type * as React from 'react'

import clsx from 'clsx'

type Props = {
  active: boolean
  onClick: (active: boolean) => void
  className?: string
  labelActive: React.ReactNode
  labelInactive: React.ReactNode
}

export function SwitchToggle({
  active,
  onClick,
  className,
  labelActive,
  labelInactive,
}: Props) {
  return (
    <div
      className={clsx('flex flex-col items-center justify-center', className)}
    >
      <div
        className="flex items-center justify-center"
        onClick={() => onClick(active)}
      >
        <span className="text-sm text-white">{labelInactive}</span>
        <div
          className={clsx(
            'mx-3 flex h-7 w-14 items-center rounded-full px-1 transition',
            {
              'bg-gray-500': !active,
              'bg-purple-500': active,
            },
          )}
        >
          <div
            className={clsx(
              'h-5 w-5 transform rounded-full bg-white shadow-md transition',
              {
                'translate-x-7': active,
              },
            )}
          />
        </div>
        <span className="text-sm text-white">{labelActive}</span>
      </div>
    </div>
  )
}
