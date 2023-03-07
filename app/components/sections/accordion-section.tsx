import React from 'react'

import { motion, useReducedMotion } from 'framer-motion'

import { Accordion } from '~/components/accordion'
import { Grid } from '~/components/grid'
import { H3, Subtitle } from '~/components/typography'
import type { Section } from '~/types'

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
    <motion.div className="bg-gray-900 py-28">
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
            <Subtitle className="mb-4" variant="pink">
              {subtitle}
            </Subtitle>
          </motion.div>
          <motion.div variants={childVariants}>
            <H3 as="h2" className="mb-10 lg:mb-28" inverse>
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
