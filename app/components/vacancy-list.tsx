import { Link } from '@remix-run/react'
import { H5 } from '~/components/typography'
import type { Vacancy } from '~/types'
import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'

export function VacancyList({
	vacancies,
	theme = 'dark',
	transition = true,
}: {
	vacancies: Vacancy[]
	theme?: 'dark' | 'light'
	transition?: boolean
}) {
	const shouldReduceMotion = useReducedMotion()
	return (
		<motion.ul
			className="-mt-6"
			initial="initial"
			whileInView="visible"
			viewport={{ once: true }}
			variants={
				transition
					? {
							initial: { opacity: 0 },
							visible: {
								opacity: 1,
								transition: { staggerChildren: 0.2, delay: 0.15 },
							},
						}
					: {}
			}
		>
			{vacancies.map(vacancy => (
				<motion.li
					key={vacancy.name}
					variants={{
						initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
						visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
					}}
				>
					<Link
						to={`/${vacancy.slug}`}
						className={clsx('block border-b py-6 transition ', {
							'border-secondary hover:border-white focus:border-white':
								theme === 'light',
							'border-primary hover:border-black focus:border-black':
								theme === 'dark',
						})}
					>
						<H5 as="span" inverse={theme === 'light'}>
							{vacancy.name}
						</H5>
					</Link>
				</motion.li>
			))}
		</motion.ul>
	)
}
