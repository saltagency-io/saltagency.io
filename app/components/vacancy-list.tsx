import * as React from 'react'

import { Link } from '@remix-run/react'

import clsx from 'clsx'

import type { Vacancy } from '../../types'
import { H4 } from '~/components/typography'

export function VacancyList({
  vacancies,
  theme = 'dark',
}: {
  vacancies: Vacancy[]
  theme?: 'dark' | 'light'
}) {
  return (
    <ul className="-mt-6">
      {vacancies.map((vacancy) => (
        <li key={vacancy.name}>
          <Link
            to={`/${vacancy.slug}`}
            className={clsx('block border-b py-6 transition ', {
              'border-secondary hover:border-white focus:border-white':
                theme === 'light',
              'border-primary hover:border-black focus:border-black':
                theme === 'dark',
            })}
          >
            <H4 as="span" inverse={theme === 'light'}>
              {vacancy.name}
            </H4>
          </Link>
        </li>
      ))}
    </ul>
  )
}
