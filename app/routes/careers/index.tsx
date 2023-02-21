import * as React from 'react'

import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

import { Grid } from '~/components/grid'
import { H2 } from '~/components/typography'
import type { LoaderData as RootLoaderData } from '~/root'
import { useLabels } from '~/utils/labels-provider'
import { getUrl } from '~/utils/misc'
import { useVacancies } from '~/utils/providers'
import { getSocialMetas } from '~/utils/seo'

export const meta: MetaFunction = ({ parentsData }) => {
  const { requestInfo } = parentsData.root as RootLoaderData
  return {
    ...getSocialMetas({
      title: 'Jobs | Salt',
      description: 'Come work with us!',
      url: getUrl(requestInfo),
    }),
  }
}

export default function JobsIndex() {
  const { vacancies } = useVacancies()
  const { t } = useLabels()

  return (
    <div className="min-h-[60vh]">
      <Grid as="main" className="min-h-screen">
        <div className="col-span-full">
          <H2 as="h1" className="mb-8">
            {t('jobs.title')}
          </H2>
        </div>
        <ul className="col-span-full">
          {vacancies.map((vacancy) => (
            <li key={vacancy.uuid} className="mb-2">
              <Link
                to={vacancy.slug}
                className="text-lg text-purple-500 hover:underline"
              >
                &rsaquo; {vacancy.name}
              </Link>
            </li>
          ))}
        </ul>
      </Grid>
    </div>
  )
}
