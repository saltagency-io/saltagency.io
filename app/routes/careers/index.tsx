import * as React from 'react'

import type { MetaFunction } from '@remix-run/node'

import { ButtonLink } from '~/components/button'
import { GradientCircle } from '~/components/gradient-circle'
import { Grid } from '~/components/grid'
import { H1, H4 } from '~/components/typography'
import { VacancyList } from '~/components/vacancy-list'
import type { LoaderData as RootLoaderData } from '~/root'
import { useLabels } from '~/utils/labels-provider'
import { mapVacancy } from '~/utils/mappers'
import { getUrl } from '~/utils/misc'
import { useVacancies } from '~/utils/providers'
import { getSocialMetas } from '~/utils/seo'

export const meta: MetaFunction = ({ parentsData }) => {
  const { requestInfo } = parentsData.root as RootLoaderData
  return {
    ...getSocialMetas({
      title: 'Careers | Salt',
      description: 'Open positions at Salt. Come and join us!',
      url: getUrl(requestInfo),
    }),
  }
}

export default function CareersIndex() {
  const { t } = useLabels()
  const { vacancies } = useVacancies()

  return (
    <main className="relative min-h-screen overflow-x-hidden py-12 lg:overflow-x-visible lg:py-14">
      <Grid>
        <div className="col-span-full lg:col-span-6">
          <H1 className="mb-6">{t('careers.title')}</H1>
          <H4 as="h2" variant="secondary" className="lg:mb-7">
            {t('careers.subtitle')}
          </H4>
          <div className="py-16 lg:py-24">
            <VacancyList theme="dark" vacancies={vacancies.map(mapVacancy)} />
          </div>
          <div className="mb-12">
            <H4 as="p" variant="secondary" className="mb-8">
              {t('careers.text')}
            </H4>
            <ButtonLink to="/contact" variant="secondary">
              {t('careers.cta')}
            </ButtonLink>
          </div>
        </div>
      </Grid>
      {/*Mobile*/}
      <GradientCircle
        className="block lg:hidden"
        height={758}
        width={758}
        top={60}
        right={-520}
        opacity={15}
        rotate={-75}
      />
      {/*Desktop*/}
      <GradientCircle
        className="hidden lg:block"
        height={1100}
        width={1100}
        top={1}
        right={-545}
        opacity={22}
      />
    </main>
  )
}
