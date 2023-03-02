import * as React from 'react'

import { Link, useLocation } from '@remix-run/react'

import clsx from 'clsx'

import { IconChevronLeft, IconChevronRight } from '~/components/icons'
import { unslugify } from '~/utils/misc'

export function Breadcrumbs() {
  const location = useLocation()
  const parts = location.pathname.slice(1).split('/')

  const BackLink = () => (
    <Link
      to={`/${parts.slice(0, -1).join('/')}`}
      className="inline-flex items-center gap-x-2 text-gray-600"
    >
      <IconChevronLeft height={16} width={16} />
      <span className="text-lg font-bold lg:text-2xl">
        {unslugify(parts[parts.length - 2])}
      </span>
    </Link>
  )

  return (
    <nav>
      {/*Mobile*/}
      <div className="block lg:hidden">
        <BackLink />
      </div>
      {/*Desktop*/}
      <div className="hidden lg:block">
        {parts.length <= 2 ? (
          // If we 2 or less url parts, we can only navigate one level back,
          // so show a back link instead of the full breadcrumbs
          <BackLink />
        ) : (
          <ol className="hidden items-center gap-x-2 lg:flex">
            {parts.map((part, i) => {
              const isLastItem = i + 1 === parts.length
              const base = parts.slice(0, i).join('/')

              return (
                <li
                  key={part}
                  className="flex items-center gap-x-2 text-gray-600"
                >
                  <Link
                    to={`${i !== 0 ? `/${base}` : ''}/${part}`}
                    prefetch="intent"
                    aria-current={isLastItem ? 'page' : undefined}
                    className={clsx('underlined hover:active focus:active', {
                      'pointer-events-none': isLastItem,
                    })}
                  >
                    <span
                      className={clsx('text-lg font-bold lg:text-2xl', {
                        'font-medium text-gray-500': isLastItem,
                      })}
                    >
                      {unslugify(part)}
                    </span>
                  </Link>
                  {!isLastItem ? (
                    <IconChevronRight height={16} width={16} />
                  ) : null}
                </li>
              )
            })}
          </ol>
        )}
      </div>
    </nav>
  )
}
