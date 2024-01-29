import { motion, useReducedMotion } from 'framer-motion'

import { Grid } from '#app/components/grid.tsx'
import { H3, H4, H5, Paragraph } from '#app/components/typography.tsx'
import type { Section } from '#app/types.ts'
import { sbIconMap } from '#app/utils/storyblok.ts'

type Props = {
	subtitle: string
	title: string
	sections: Section[]
}

export function ApplicationProcessSection({
	subtitle,
	title,
	sections,
}: Props) {
	const shouldReduceMotion = useReducedMotion()

	const childVariants = {
		initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
	}

	return (
		<motion.div
			initial="initial"
			whileInView="visible"
			viewport={{ once: true, margin: '-115px 0px' }}
			variants={{
				initial: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: { staggerChildren: 0.2, delay: 0.1 },
				},
			}}
		>
			<Grid>
				<motion.div
					className="col-span-full lg:col-span-3"
					variants={childVariants}
				>
					<H5 as="h2" variant="secondary" className="mb-2">
						{subtitle}
					</H5>
					<H3 className="mb-16 lg:mb-0" inverse>
						{title}
					</H3>
				</motion.div>
				<div className="col-span-full lg:col-span-8 lg:col-start-5">
					{sections.map(section => {
						const Icon = sbIconMap[section.icon ?? '']
						return (
							<motion.div
								key={section.id}
								variants={childVariants}
								className="border-secondary border-b py-6 first:pt-0 lg:px-4 lg:py-8"
							>
								{Icon ? (
									<div className="mb-3 text-white">
										<Icon height={32} width={32} />
									</div>
								) : (
									`Unknown icon: ${section.icon}`
								)}
								<H4 as="h3" className="mb-2" inverse>
									{section.title}
								</H4>
								<Paragraph
									size="xl"
									textColorClassName="text-inverse-secondary"
								>
									{section.text}
								</Paragraph>
							</motion.div>
						)
					})}
				</div>
			</Grid>
		</motion.div>
	)
}
