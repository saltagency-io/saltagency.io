import * as React from 'react'

import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'

import { Grid } from '~/components/grid'
import { H3, H4, Subtitle } from '~/components/typography'
import type { Image } from '~/types'
import { getImgProps } from '~/utils/images'

type Props = {
  subtitle: string
  title: string
  body: string
  image?: Image
  theme?: 'dark' | 'light'
}

export function TextSection({
  subtitle,
  title,
  body,
  image,
  theme = 'light',
}: Props) {
  const shouldReduceMotion = useReducedMotion()

  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <div
      className={clsx('py-24 lg:py-40', {
        'bg-primary': theme === 'light',
        'bg-inverse': theme === 'dark',
      })}
    >
      <Grid>
        <motion.div
          className="col-span-full lg:col-span-10 lg:col-start-2"
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
            <Subtitle
              className="mb-4"
              variant={theme === 'dark' ? 'pink' : 'purple'}
            >
              {subtitle}
            </Subtitle>
          </motion.div>
          <motion.div variants={childVariants}>
            <H3 as="h2" className="mb-6" inverse={theme === 'dark'}>
              {title}
            </H3>
          </motion.div>
          <motion.div variants={childVariants}>
            <H4 as="p" variant="secondary" inverse={theme === 'dark'}>
              {body}
            </H4>
          </motion.div>
          {image ? (
            <motion.div className="-ml-8vw -mr-8vw pt-12 lg:m-0">
              <img
                className="w-full lg:rounded-lg"
                {...getImgProps(image.url, image.alt, {
                  widths: [431, 862, 1724],
                  sizes: [
                    '(max-width: 1023px) 100vw',
                    '(min-width: 1024px) 60vw',
                  ],
                })}
              />
            </motion.div>
          ) : null}
        </motion.div>
      </Grid>
    </div>
  )
}
