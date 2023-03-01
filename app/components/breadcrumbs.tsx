import * as React from 'react'

import { Link, useLocation } from '@remix-run/react'

import clsx from 'clsx'

import { IconChevronRight } from '~/components/icons'
import { unslugify } from '~/utils/misc'

export function Breadcrumbs() {
  const location = useLocation()
  const parts = location.pathname.slice(1).split('/')

  return (
    <nav>
      <ol className="flex items-center gap-x-3">
        {parts.map((part, i) => {
          const isLastItem = i + 1 === parts.length
          const base = parts.slice(0, i).join('/')

          return (
            <React.Fragment key={part}>
              <Link
                to={`${i !== 0 ? `/${base}` : ''}/${part}`}
                prefetch="intent"
                aria-current={isLastItem ? 'page' : undefined}
                className={clsx(
                  'underlined hover:active focus:active text-gray-600',
                  {
                    'pointer-events-none': isLastItem,
                  },
                )}
              >
                <span
                  className={clsx(
                    'text-lg font-bold text-gray-600 lg:text-2xl',
                    {
                      'font-medium text-gray-500': isLastItem,
                    },
                  )}
                >
                  {unslugify(part)}
                </span>
              </Link>
              {!isLastItem ? <IconChevronRight height={16} width={16} /> : null}
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
