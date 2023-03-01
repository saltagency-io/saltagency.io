import type * as React from 'react'

import { Link } from '@remix-run/react'

import { ButtonLink } from '~/components/button'
import { Grid } from '~/components/grid'
import { IconChevronLeft } from '~/components/icons'
import { H1, H4 } from '~/components/typography'

type Props = {
  children: React.ReactNode
  title: string
  summary: string
  slug: string
}

export function Vacancy({ children, title, summary, slug }: Props) {
  return (
    <>
      <Grid as="header" className="pt-12 lg:pt-14">
        <div className="col-span-full lg:col-span-10">
          <Link
            to="/careers"
            className="mb-4 flex items-center gap-x-2 text-gray-600 lg:mb-6"
          >
            <IconChevronLeft height={16} width={16} />
            <span className="text-lg font-bold lg:text-2xl">Careers</span>
          </Link>
          <H1 className="mb-4 lg:mb-6">{title}</H1>
          <H4 as="h2" variant="secondary" className="mb-8">
            {summary}
          </H4>
          <ButtonLink
            to={`/careers/${slug}/apply?role=${encodeURIComponent(title)}`}
          >
            Apply now
          </ButtonLink>
        </div>
      </Grid>
      {children}
    </>
  )
}
