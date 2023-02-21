import * as React from 'react'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import { Grid } from '~/components/grid'
import type { Image } from '~/types'

type Props = {
  logos: Image[]
}
export function ClientsSection({ logos }: Props) {
  return (
    <Grid as="section" className="hidden py-16 lg:grid">
      <motion.div
        className={clsx(
          'col-span-4 flex flex-col items-center justify-center gap-12',
          'md:col-span-8 lg:col-start-3 lg:flex-row',
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {logos.map((logo) => (
          <div key={logo.id}>
            <img className="object-contain" src={logo.url} alt={logo.alt} />
          </div>
        ))}
      </motion.div>
    </Grid>
  )
}
