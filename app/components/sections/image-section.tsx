import * as React from 'react'

import { motion } from 'framer-motion'

import { Grid } from '~/components/grid'
import type { Image } from '~/types'

export function ImageSection({ image }: { image: Image }) {
  return (
    <div className="py-24">
      <Grid>
        <motion.div
          className="col-span-full -mx-12"
          initial="initial"
          whileInView="visible"
          viewport={{ once: true, margin: '-115px 0px' }}
          variants={{
            initial: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <img className="w-full" src={image.url} alt={image.alt} />
        </motion.div>
      </Grid>
    </div>
  )
}
