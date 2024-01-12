import type * as React from 'react'

import { Breadcrumbs } from '~/components/breadcrumbs'
import { ButtonLink } from '~/components/button'
import { Grid } from '~/components/grid'
import { H3, H5 } from '~/components/typography'
import { routes } from '~/routes/($lang)/vacatures/$slug.solliciteren'
import { useI18n } from '~/utils/i18n-provider'
import { useLabels } from '~/utils/labels-provider'

type Props = {
  children: React.ReactNode
  title: string
  summary: string
}

export function Vacancy({ children, title, summary }: Props) {
  const { language } = useI18n()
  const { t } = useLabels()

  return (
    <>
      <Grid as="header" className="pt-8 lg:pt-14">
        <div className="col-span-full mb-4 lg:mb-8">
          <Breadcrumbs />
        </div>
        <div className="col-span-full lg:col-span-10">
          <H5 as="h1" variant="secondary" className="mb-2">
            {title}
          </H5>
          <H3 as="h2" className="mb-12">
            {summary}
          </H3>
          <ButtonLink
            to={`${routes[language]}?role=${encodeURIComponent(title)}`}
          >
            {t('cta.apply')}
          </ButtonLink>
        </div>
      </Grid>
      {children}
    </>
  )
}
