import * as React from 'react'

import { Link, useLocation, useRouteLoaderData } from '@remix-run/react'

import clsx from 'clsx'

import { IconChevronLeft, IconChevronRight } from '~/components/icons'
import type { LoaderData as RootLoaderData } from '~/root'
import type { Breadcrumb } from '~/types'
import { useI18n } from '~/utils/i18n-provider'
import { unslugify } from '~/utils/misc'
import { SdBreadCrumbs } from '~/utils/structured-data'

export function Breadcrumbs() {
  const location = useLocation()
  const { language } = useI18n()
  const { requestInfo }: RootLoaderData = useRouteLoaderData('root')

  const parts = location.pathname.slice(1).split('/')

  let breadcrumbs = parts.map<Breadcrumb>((part, i) => {
    const base = parts.slice(0, i).join('/')

    return {
      path: `${i !== 0 ? `/${base}` : ''}/${part}`,
      name: unslugify(part),
    }
  })

  if (breadcrumbs[0].path === `/${language}`) {
    breadcrumbs = breadcrumbs.slice(1)
  }

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
    <>
      <SdBreadCrumbs origin={requestInfo.origin} breadcrumbs={breadcrumbs} />

      <nav>
        {/*Mobile*/}
        <div className="block lg:hidden">
          <BackLink />
        </div>

        {/*Desktop*/}
        <div className="hidden lg:block">
          {breadcrumbs.length <= 2 ? (
            // If we 2 or less url parts, we can only navigate one level back,
            // so show a back link instead of the full breadcrumbs
            <BackLink />
          ) : (
            <ol className="hidden items-center gap-x-2 lg:flex">
              {breadcrumbs.map((breadcrumb, i) => {
                const isLastItem = i + 1 === breadcrumbs.length
                return (
                  <li
                    key={breadcrumb.path}
                    className="flex items-center gap-x-2 text-gray-600"
                  >
                    <Link
                      to={breadcrumb.path}
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
                        {breadcrumb.name}
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
    </>
  )
}
