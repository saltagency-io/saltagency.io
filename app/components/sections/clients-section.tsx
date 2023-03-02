import * as React from 'react'

import { motion } from 'framer-motion'

import { Grid } from '~/components/grid'
import type { Image } from '~/types'
import { getImgProps } from '~/utils/images'

type Props = {
  logos: Image[]
}
export function ClientsSection({ logos }: Props) {
  return (
    <Grid as="section" className="hidden py-16 lg:grid">
      <motion.div
        className="col-span-full flex items-center justify-center gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {logos.map((logo) => (
          <div key={logo.id}>
            <img
              className="object-cover"
              {...getImgProps(logo.url, logo.alt, {
                widths: [250],
                sizes: ['250px'],
                transformations: {
                  width: 0,
                  height: 60,
                },
              })}
            />
          </div>
        ))}
      </motion.div>
    </Grid>
  )
}
