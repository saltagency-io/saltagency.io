import type * as React from 'react'

import { motion } from 'framer-motion'

import { Grid } from '#app/components/grid.tsx'
import { H3, H5 } from '#app/components/typography.tsx'
import { VacancyList } from '#app/components/vacancy-list.tsx'
import { useLocalizedMappers } from '#app/utils/mappers.ts'
import { useGroup, useVacancies } from '#app/utils/providers.tsx'

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
