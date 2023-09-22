import * as React from 'react'

import { motion } from 'framer-motion'

import { Grid } from '~/components/grid'
import type { Image } from '~/types'
import { getImgProps } from '~/utils/images'

export function ImageSection({ image }: { image: Image }) {
  return (
    <div className="py-24">
      <Grid>
        <motion.div
          className="col-span-full -mx-8vw overflow-hidden lg:-mx-12 lg:rounded-lg"
          initial="initial"
          whileInView="visible"
          viewport={{ once: true, margin: '-115px 0px' }}
          variants={{
            initial: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <img
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
    </div>
  )
}
