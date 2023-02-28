import type * as React from 'react'

import { motion, useReducedMotion } from 'framer-motion'

import { GradientCircle } from '~/components/gradient-circle'
import { Grid } from '~/components/grid'
import { H1, H4 } from '~/components/typography'

type Props = {
  title: string
  body: string
  children?: React.ReactNode
}

export function HeroSection({ children, title, body }: Props) {
  const shouldReduceMotion = useReducedMotion()

  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="relative py-12 lg:py-48">
      {/*Mobile*/}
      <GradientCircle
        className="block lg:hidden"
        height={521}
        width={521}
        top={120}
        left={-400}
      />
      {/*Desktop*/}
      <GradientCircle
        className="hidden lg:block"
        height={1013}
        width={1013}
        top={30}
        left={-400}
        opacity={20}
      />

      <Grid as="header">
        <motion.div
          className="col-span-4 md:col-span-8 lg:col-start-3"
          initial="initial"
          animate="visible"
          variants={{
            initial: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.div variants={childVariants}>
            <H1 className="mb-6 text-center">{title}</H1>
          </motion.div>

          <motion.div className="lg:px-32" variants={childVariants}>
            <H4 as="h2" className="text-center" variant="secondary">
              {body}
            </H4>
          </motion.div>

          <motion.div
            className="mx-auto flex flex-col items-center justify-center gap-4 pt-12 lg:flex-row lg:gap-6"
            variants={childVariants}
          >
            {children}
          </motion.div>
        </motion.div>
      </Grid>

      {/*Mobile*/}
      <GradientCircle
        className="block lg:hidden"
        height={566}
        width={566}
        right={-486}
        top={140}
      />
      {/*Desktop*/}
      <GradientCircle
        className="hidden lg:block"
        height={1100}
        width={1100}
        right={-600}
        top={10}
        opacity={20}
      />
    </div>
  )
}
