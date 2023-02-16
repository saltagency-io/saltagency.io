import * as React from 'react'

import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import type { LoaderFunctionArgs } from '@remix-run/router'

import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import { Grid } from '~/components/grid'
import { H2 } from '~/components/typography'
import { getAllVacancies } from '~/lib/storyblok.server'
import type { LoaderData as RootLoaderData } from '~/root'
import { useLabels } from '~/utils/labels-provider'
import { getUrl } from '~/utils/misc'
import { getSocialMetas } from '~/utils/seo'
import { isPreview } from '~/utils/storyblok'

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

export async function loader({ request }: LoaderFunctionArgs) {
  const preview = isPreview(request)
  const vacancies = await getAllVacancies(preview)

  const data = {
    vacancies,
  }

  const headers = {
    'Cache-Control': 'private, max-age=3600',
  }

  return typedjson(data, { status: 200, headers })
}

export default function JobsIndex() {
  const data = useTypedLoaderData<typeof loader>()
  const { t } = useLabels()

  return (
    <div className="min-h-[60vh]">
      <Grid as="main">
        <div className="col-span-full">
          <H2 as="h1" className="mb-8">
            {t('jobs.title')}
          </H2>
        </div>
        <ul className="col-span-full">
          {(data.vacancies || []).map((vacancy) => (
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
