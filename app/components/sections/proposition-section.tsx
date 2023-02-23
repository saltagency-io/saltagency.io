import * as React from 'react'

import { motion, useReducedMotion } from 'framer-motion'

import { Grid } from '~/components/grid'
import { H3, H4, Subtitle } from '~/components/typography'
import type { Section } from '~/types'

type Props = {
  subtitle: string
  title: string
  sections: Section[]
}

export function PropositionSection({ subtitle, title, sections }: Props) {
  const shouldReduceMotion = useReducedMotion()

  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      className="bg-inverse py-20 lg:py-40"
      initial="initial"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: { staggerChildren: 0.3, delay: 0.2 },
        },
      }}
    >
      <Grid>
        <motion.div className="col-span-full" variants={childVariants}>
          <Subtitle variant="pink" className="mb-4">
            {subtitle}
          </Subtitle>
          <H3 as="h2" className="text-inverse mb-8 lg:mb-14">
            {title}
          </H3>
        </motion.div>
        <div className="col-span-full">
          {sections.map((section) => (
            <motion.div key={section.id} variants={childVariants}>
              <Grid nested className="border-secondary border-b py-8 lg:py-14">
                <div className="col-span-6">
                  <H4 as="h3" className="text-inverse pb-2 lg:pb-0">
                    {section.title}
                  </H4>
                </div>
                <div className="col-span-6">
                  <H4 as="p" className="text-inverse-secondary">
                    {section.text}
                  </H4>
                </div>
              </Grid>
            </motion.div>
          ))}
        </div>
      </Grid>
    </motion.div>
  )
}
