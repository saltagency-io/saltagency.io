import type * as React from 'react'

import { Link } from '@remix-run/react'

import { Grid } from '~/components/grid'
import { H3, H4, Subtitle } from '~/components/typography'
import { useVacancies } from '~/utils/providers'

type Props = {
  children: React.ReactNode
  subtitle: string
  title: string
}

export function CareersSection({ children, subtitle, title }: Props) {
  const { vacancies } = useVacancies()

  console.log({ vacancies })

  return (
    <div className="bg-gradient py-40">
      <Grid>
        <div className="col-span-5">
          <Subtitle variant="pink" className="mb-4">
            {subtitle}
          </Subtitle>
          <H3 as="h2" inverse className="mb-12">
            {title}
          </H3>
          {children}
        </div>
        <div className="col-span-6 col-start-7">
          {vacancies.map((vacancy) => (
            <Link
              key={vacancy.id}
              to={`/${vacancy.full_slug}`}
              className="block py-6 first:pt-0 border-b border-light"
            >
              <H4 as="span" inverse>
                {vacancy.name}
              </H4>
            </Link>
          ))}
        </div>
      </Grid>
    </div>
  )
}
