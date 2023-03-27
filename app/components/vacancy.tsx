import type * as React from 'react'

import { Breadcrumbs } from '~/components/breadcrumbs'
import { ButtonLink } from '~/components/button'
import { Grid } from '~/components/grid'
import { H1, H4 } from '~/components/typography'
import { useI18n } from '~/utils/i18n-provider'
import { useLabels } from '~/utils/labels-provider'

type Props = {
  children: React.ReactNode
  title: string
  summary: string
  slug: string
}

export function Vacancy({ children, title, summary, slug }: Props) {
  const { language, isDefaultLanguage } = useI18n()
  const { t } = useLabels()

  const url = `${
    isDefaultLanguage ? '' : `/${language}`
  }/careers/${slug}/apply?role=${encodeURIComponent(title)}`

  return (
    <>
      <Grid as="header" className="pt-8 lg:pt-14">
        <div className="col-span-full mb-4 lg:mb-8">
          <Breadcrumbs />
        </div>
        <div className="col-span-full lg:col-span-10">
          <H1 className="mb-4 lg:mb-6">{title}</H1>
          <H4 as="h2" variant="secondary" className="mb-8">
            {summary}
          </H4>
          <ButtonLink to={url}>{t('cta.apply')}</ButtonLink>
        </div>
      </Grid>
      {children}
    </>
  )
}
