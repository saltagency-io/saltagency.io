import { Link, useLocation } from '@remix-run/react'
import clsx from 'clsx'

import { Icon } from '#app/components/ui/icon.tsx'
import { type Breadcrumb } from '#app/types.ts'
import { useI18n } from '#app/utils/i18n-provider.tsx'
import { type SupportedLanguage } from '#app/utils/i18n.ts'
import { unslugify } from '#app/utils/misc.tsx'

export function createBreadcrumbs(path: string, language: SupportedLanguage) {
  const parts = path.slice(1).split('/')

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

  return breadcrumbs
}

export function Breadcrumbs() {
  const location = useLocation()
  const { language } = useI18n()

  const parts = location.pathname.slice(1).split('/')
  const breadcrumbs = createBreadcrumbs(location.pathname, language)

  const BackLink = () => (
    <Link
      to={`/${parts.slice(0, -1).join('/')}`}
      className="inline-flex items-center gap-x-2 text-gray-600"
    >
      <Icon name="chevron-left" />
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
                  {!isLastItem ? <Icon name="chevron-right" /> : null}
                </li>
              )
            })}
          </ol>
        )}
      </div>
    </nav>
  )
}
