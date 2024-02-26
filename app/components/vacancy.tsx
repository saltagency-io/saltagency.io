import * as React from 'react'

import { useTranslation } from 'react-i18next'

import { Breadcrumbs } from '#app/components/breadcrumbs.tsx'
import { Grid } from '#app/components/grid.tsx'
import { ButtonLink } from '#app/components/ui/button.tsx'
import { H3, H5 } from '#app/components/ui/typography.tsx'
import { routes } from '#app/routes/($lang)+/vacatures.$slug.solliciteren.tsx'

type Props = {
  children: React.ReactNode
  title: string
  summary: string
}

export function Vacancy({ children, title, summary }: Props) {
  const { i18n } = useTranslation()
  const { t } = useTranslation()

  return (
    <>
      <Grid as="header" className="pt-8 lg:pt-14">
        <div className="col-span-full mb-4 lg:mb-16">
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
            to={`${routes[i18n.language]}?role=${encodeURIComponent(title)}`}
          >
            {t('cta.apply')}
          </ButtonLink>
        </div>
      </Grid>
      {children}
    </>
  )
}
