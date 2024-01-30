import { motion } from 'framer-motion'

import { Grid } from '#app/components/grid.tsx'
import  { type Image } from '#app/types.ts'
import { getImgProps } from '#app/utils/images.ts'

export function ImageSection({ image }: { image: Image }) {
	return (
		<Grid>
			<motion.div
				className="col-span-full -mx-4 overflow-hidden lg:-mx-8vw lg:rounded-4xl"
				initial="initial"
				whileInView="visible"
				viewport={{ once: true, margin: '-115px 0px' }}
				variants={{
					initial: { opacity: 0 },
					visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
				}}
			>
				<img
					loading="lazy"
					className="aspect-[2/1] w-full object-cover"
					{...getImgProps(image.url, image.alt, {
						widths: [375, 724, 1136],
						sizes: [
							'(max-width: 1023px) 100vw',
							'(min-width: 1024px) 78vw',
							'375px',
						],
						transformations: {
							quality: 95,
						},
					})}
				/>
			</motion.div>
		</Grid>
	)
}
