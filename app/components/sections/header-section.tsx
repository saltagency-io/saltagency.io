import * as React from 'react'

import { Link } from '@remix-run/react'

import { motion, useReducedMotion } from 'framer-motion'

import { GradientCircle } from '~/components/gradient-circle'
import { Grid } from '~/components/grid'
import { IconArrowDown } from '~/components/icons'
import { H1, H4, Paragraph } from '~/components/typography'
import { useLabels } from '~/utils/labels-provider'

type Props = {
  title: string
  body: string
}

export function HeaderSection({ title, body }: Props) {
  const shouldReduceMotion = useReducedMotion()
  const { t } = useLabels()

  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="relative pt-8 pb-10 lg:pb-40 lg:pt-32">
      {/*Mobile*/}
      <GradientCircle
        className="mx-auto block lg:hidden"
        opacity={20}
        height={500}
        width={500}
        top={120}
        left={1}
        right={1}
      />
      {/*Desktop*/}
      <GradientCircle
        className="mx-auto hidden lg:block"
        opacity={20}
        height={860}
        width={860}
        top={130}
        left={1}
        right={1}
      />
      <Grid as="header">
        <motion.div
          className="col-span-full lg:col-span-10 lg:col-start-2"
          initial="initial"
          animate="visible"
          variants={{
            initial: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.div variants={childVariants}>
            <H1 className="mb-4 lg:mb-10 lg:text-center">{title}</H1>
          </motion.div>
          <motion.div variants={childVariants}>
            <H4 as="p" variant="secondary" className="lg:text-center">
              {body}
            </H4>
          </motion.div>
          <motion.div
            className="pt-28 text-center lg:pt-52"
            variants={childVariants}
          >
            <Link className="inline-block" to="#formula">
              <Paragraph
                className="hover:text-primary flex flex-col items-center gap-2 text-lg transition lg:flex-row lg:text-2xl"
                as="span"
                textColorClassName="text-secondary"
              >
                {t('indicator.scroll')} <IconArrowDown />
              </Paragraph>
            </Link>
          </motion.div>
        </motion.div>
      </Grid>
    </div>
  )
}
