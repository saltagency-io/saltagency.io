import * as React from 'react'

import { Grid } from '~/components/grid'
import { H3, H4, H5, Paragraph } from '~/components/typography'
import type { Section } from '~/types'
import { sbIconMap } from '~/utils/storyblok'
import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'

type Props = {
	subtitle: string
	title: string
	sections: Section[]
}

export function FormulaSection({ subtitle, title, sections }: Props) {
	const shouldReduceMotion = useReducedMotion()

	return (
		<motion.div
			id="formula"
			initial="initial"
			whileInView="visible"
			viewport={{ once: true, margin: '-115px 0px' }}
			variants={{
				initial: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: { staggerChildren: 0.15, delay: 0.2 },
				},
			}}
		>
			<Grid className="gap-x-0 md:gap-x-0 lg:gap-x-0">
				<div className="col-span-full">
					<H5 as="h2" variant="secondary" className="mb-2">
						{subtitle}
					</H5>
					<H3 className="mb-10">{title}</H3>
				</div>
				{sections.map((section, i) => {
					const Icon = sbIconMap[section.icon ?? '']
					return (
						<motion.div
							key={section.id}
							variants={{
								initial: { opacity: 0, x: shouldReduceMotion ? 0 : 25 },
								visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
							}}
							className={clsx(
								'relative col-span-full border-b border-gray-100 last:border-b-0 lg:col-span-4 lg:border-b-0 lg:border-r lg:px-4',
								'after:absolute after:bottom-0 after:h-px after:w-10/12 after:bg-gray-100',
								{
									'lg:pl-0': i === 0 || i === 3,
									'lg:pr-0': i === 2 || i === 5,
									'lg:border-r-0': i === 2 || i === 5 || i === 8,
									'lg:after:hidden':
										(sections.length <= 6 && i > 2) ||
										(sections.length > 6 && i > 5) ||
										sections.length < 4,
								},
							)}
						>
							<div className="py-6 lg:px-6 lg:py-12">
								<div className="mb-4 text-gray-600">
									{Icon ? (
										<Icon height={32} width={32} />
									) : (
										`Unknown icon: ${section.icon}`
									)}
								</div>
								<H4 as="h3" className="mb-4">
									{section.title}
								</H4>
								<Paragraph size="xl" textColorClassName="text-secondary">
									{section.text}
								</Paragraph>
							</div>
						</motion.div>
					)
				})}
			</Grid>
		</motion.div>
	)
}
