import { Grid } from '~/components/grid'
import { H2, H5, Paragraph } from '~/components/typography'
import type { Image } from '~/types'
import { getImgProps } from '~/utils/images'
import { useGroup } from '~/utils/providers'
import clsx from 'clsx'
import { motion } from 'framer-motion'

type Props = {
	subtitle?: string
	title: string
	text?: string
	image: Image
	imagePosition: 'left' | 'right'
	titleVariant: 'large' | 'small'
}
export function Banner({
	subtitle,
	title,
	text,
	image,
	imagePosition,
	titleVariant,
}: Props) {
	const { theme } = useGroup()
	const isDark = theme.startsWith('dark')

	const textVariants = {
		initial: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { staggerChildren: 0.1, delay: 0.1, duration: 0.3 },
		},
	}

	const imageAnimationVariants = {
		hidden: {
			opacity: 0,
			scale: 0.9,
			x: imagePosition === 'left' ? -100 : 100,
		},
		visible: {
			opacity: 1,
			scale: 1,
			x: 0,
			transition: {
				delay: 0.2,
				duration: 0.6,
				ease: 'easeInOut',
			},
		},
	}

	const viewPort = {
		once: true,
		margin: '-85px 0px',
	}

	return (
		<Grid className="items-center gap-x-0 gap-y-10 lg:gap-y-0">
			<motion.div
				className={clsx('col-span-full lg:col-span-6 lg:row-start-1', {
					'lg:col-start-7': imagePosition === 'left',
				})}
				initial="initial"
				whileInView="visible"
				viewport={viewPort}
				variants={textVariants}
			>
				<div className="flex flex-col-reverse">
					{titleVariant === 'small' ? (
						<H5 as="h2" inverse={isDark} className="mb-2">
							{title}
						</H5>
					) : (
						<H2 inverse={isDark} className="mb-2">
							{title}
						</H2>
					)}
					{subtitle ? (
						<H5 as="h3" variant="secondary" className="mb-2">
							{subtitle}
						</H5>
					) : null}
				</div>
				{text ? (
					<Paragraph
						className="text-lg"
						textColorClassName={isDark ? 'text-white' : 'text-gray-800'}
					>
						{text}
					</Paragraph>
				) : null}
			</motion.div>

			{image ? (
				<motion.div
					className={clsx(
						'col-span-full lg:col-span-6 lg:flex lg:flex-col lg:justify-center',
						{
							'lg:col-start-7': imagePosition === 'right',
						},
					)}
					initial="hidden"
					whileInView="visible"
					viewport={viewPort}
					variants={imageAnimationVariants}
				>
					<img
						className="w-full object-cover"
						{...getImgProps(image.url, image.alt, {
							widths: [375, 508, 1016],
							sizes: [
								'(max-width: 1023px) 84vw',
								'(min-width: 1024px) 35vw',
								'375px',
							],
						})}
					/>
				</motion.div>
			) : null}
		</Grid>
	)
}
