import { motion, useReducedMotion } from 'framer-motion'

import { Accordion } from '#app/components/accordion.tsx'
import { Grid } from '#app/components/grid.tsx'
import { H3, H5 } from '#app/components/typography.tsx'
import  { type Section } from '#app/types.ts'

type Props = {
	subtitle: string
	title: string
	sections: Section[]
}

export function AccordionSection({ subtitle, title, sections }: Props) {
	const shouldReduceMotion = useReducedMotion()

	const childVariants = {
		initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
	}

	return (
		<motion.div className="py-28">
			<Grid>
				<motion.div
					className="col-span-full"
					initial="initial"
					whileInView="visible"
					viewport={{ once: true, margin: '-115px 0px' }}
					variants={{
						initial: { opacity: 0 },
						visible: {
							opacity: 1,
							transition: { staggerChildren: 0.1, delay: 0.1 },
						},
					}}
				>
					<motion.div variants={childVariants}>
						<H5 as="h2" className="mb-4" variant="secondary">
							{subtitle}
						</H5>
					</motion.div>
					<motion.div variants={childVariants}>
						<H3 className="mb-10" inverse>
							{title}
						</H3>
					</motion.div>
					<motion.div variants={childVariants}>
						<Accordion items={sections} />
					</motion.div>
				</motion.div>
			</Grid>
		</motion.div>
	)
}
