import type * as React from 'react'

import { motion } from 'framer-motion'

import { Grid } from '~/components/grid'
import { H3, H5 } from '~/components/typography'
import { VacancyList } from '~/components/vacancy-list'
import { useLocalizedMappers } from '~/utils/mappers'
import { useGroup, useVacancies } from '~/utils/providers'

type Props = {
  children: React.ReactNode
  subtitle: string
  title: string
}

export function CareersSection({ children, subtitle, title }: Props) {
  const { theme } = useGroup()
  const { vacancies } = useVacancies()
  const { mapVacancy } = useLocalizedMappers()

  return (
    <Grid>
      <motion.div
        className="col-span-4 mb-12 md:col-span-8 lg:col-span-5 lg:mb-16"
        initial="initial"
        whileInView="visible"
        viewport={{ once: true, margin: '-115px 0px' }}
        variants={{
          initial: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.25, delay: 0.1 } },
        }}
      >
        <H5 as="h2" variant="secondary" className="mb-4">
          {subtitle}
        </H5>
        <H3 as="span" inverse={theme.startsWith('dark')}>
          {title}
        </H3>
        <div className="hidden lg:mt-12 lg:block">{children}</div>
      </motion.div>
      <div className="col-span-4 flex pt-2 md:col-span-8 lg:col-span-6 lg:col-start-7">
        <VacancyList
          theme={theme.startsWith('dark') ? 'light' : 'dark'}
          vacancies={vacancies.map(mapVacancy)}
        />
      </div>
      {children || (Array.isArray(children) && children.length !== 0) ? (
        <div className="block pt-14 lg:hidden">{children}</div>
      ) : null}
    </Grid>
  )
}
