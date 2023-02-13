import type * as React from 'react'

import { isString } from '@reach/utils'

import { ButtonLink } from '~/components/button'
import { Grid } from '~/components/grid'
import { H1, H2, Paragraph } from '~/components/typography'
import { useLabels } from '~/utils/labels-provider'

export function VacancySidebar({role}: {role: string}) {
  const { t } = useLabels()
  const queryParam = encodeURIComponent(role)

  return (
    <>
      <H2 as="span" className="mb-4 block">
        {t('vacancy.aside.title')}
      </H2>
      <Paragraph className="mb-2">
        {t('vacancy.aside.text')}
      </Paragraph>
      <a
        className="mb-8 block text-primary hover:underline"
        href="tel:+31634135161"
      >
        {t('vacancy.aside.phone')}
      </a>
      <ButtonLink to={`/jobs/apply?role=${queryParam}`} className="w-full">
        {t('cta.apply')}
      </ButtonLink>
    </>
  )
}

type Props = {
  children: React.ReactNode
  title: string
  summary: string
}

export function Vacancy({ children, title, summary }: Props) {
  return (
    <>
      <Grid className="mb-8 lg:mb-20">
        <div className="col-span-full">
          {isString(title) ? <H1 className="mb-6">{title}</H1> : null}
          {isString(summary) ? <Paragraph>{summary}</Paragraph> : null}
        </div>
      </Grid>
      <Grid>
        <section className="col-span-4 md:col-span-8 lg:col-span-9">
          {children}
        </section>
        <aside className="col-span-4 my-8 md:col-span-8 lg:order-[-1] lg:col-span-3 lg:my-0 lg:pr-8">
          <VacancySidebar role={title} />
        </aside>
      </Grid>
    </>
  )
}
