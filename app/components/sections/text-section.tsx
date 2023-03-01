import * as React from 'react'

import { motion, useReducedMotion } from 'framer-motion'

import { Grid } from '~/components/grid'
import { H3, H4, Subtitle } from '~/components/typography'

type Props = {
  subtitle: string
  title: string
  body: string
}

export function TextSection({ subtitle, title, body }: Props) {
  const shouldReduceMotion = useReducedMotion()

  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <Grid className="py-24 lg:py-40">
      <motion.div
        className="col-span-4 md:col-span-8 lg:col-span-10 lg:col-start-2"
        initial="initial"
        whileInView="visible"
        viewport={{ once: true, margin: '100px' }}
        variants={{
          initial: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delay: 0.1 },
          },
        }}
      >
        <motion.div variants={childVariants}>
          <Subtitle className="mb-4">{subtitle}</Subtitle>
        </motion.div>
        <motion.div variants={childVariants}>
          <H3 as="h2" className="mb-6">
            {title}
          </H3>
        </motion.div>
        <motion.div variants={childVariants}>
          <H4 as="p" variant="secondary">
            {body}
          </H4>
        </motion.div>
      </motion.div>
    </Grid>
  )
}
