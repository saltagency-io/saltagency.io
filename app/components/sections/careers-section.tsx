import type * as React from 'react'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import { Grid } from '~/components/grid'
import { H3, H5 } from '~/components/typography'
import { VacancyList } from '~/components/vacancy-list'
import { useLocalizedMappers } from '~/utils/mappers'
import { useVacancies } from '~/utils/providers'

type Props = {
  children: React.ReactNode
  subtitle: string
  title: string
  theme?: 'dark' | 'dark-alt' | 'light' | 'gray'
}

export function CareersSection({
  children,
  subtitle,
  title,
  theme = 'light',
}: Props) {
  const { vacancies } = useVacancies()
  const { mapVacancy } = useLocalizedMappers()

  return (
    <div
      className={clsx('py-20 lg:py-40', {
        'bg-white': theme === 'light',
        'bg-gradient': theme === 'dark-alt',
        'bg-gradient-dark': theme === 'dark',
        'bg-gray-body': theme === 'gray',
      })}
    >
      <Grid>
        <motion.div
          className="col-span-4 md:col-span-8 lg:col-span-5"
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
          <H3
            as="span"
            inverse={theme.startsWith('dark')}
            className="mb-14 lg:mb-12"
          >
            {title}
          </H3>
          <div className="hidden lg:mt-12 lg:block">{children}</div>
        </motion.div>
        <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
          <VacancyList
            theme={theme.startsWith('dark') ? 'light' : 'dark'}
            vacancies={vacancies.map(mapVacancy)}
          />
        </div>
        {children || (Array.isArray(children) && children.length !== 0) ? (
          <div className="block pt-14 lg:hidden">{children}</div>
        ) : null}
      </Grid>
    </div>
  )
}
