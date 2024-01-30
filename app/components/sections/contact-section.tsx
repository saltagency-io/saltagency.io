import * as React from 'react'

import { PhoneButton } from '~/components/button'
import { Grid } from '~/components/grid'
import { H3 } from '~/components/typography'
import type { Image } from '~/types'
import { getImgProps } from '~/utils/images'
import { useGroup } from '~/utils/providers'
import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  title: string
  text: string
  image: Image
  children: React.ReactNode
  phoneNumber?: string
}

export function ContactSection({
  title,
  text,
  image,
  children,
  phoneNumber,
}: Props) {
  const { theme } = useGroup()
  const isDark = theme.startsWith('dark')
  const shouldReduceMotion = useReducedMotion()

  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      className="overflow-visible"
      initial="initial"
      animate="visible"
      viewport={{ once: true, margin: '-115px 0px' }}
      variants={{
        initial: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
      }}
    >
      <Grid className="gap-y-10 overflow-visible md:gap-y-0">
        <div
          className={clsx(
            'relative z-10 col-span-full col-start-1 row-start-1 h-full overflow-visible',
            'md:col-span-4',
            'lg:col-span-5',
          )}
        >
          <img
            loading="lazy"
            className={clsx(
              'relative -left-6 -mb-12 -mt-8 block h-auto w-[calc(100%+3rem)] max-w-none',
              'md:absolute md:bottom-1/2 md:left-auto md:right-0 md:m-0 md:h-[calc(100%+theme(spacing.10))] md:w-auto md:translate-x-6 md:translate-y-1/2',
              'lg:h-[calc(100%+theme(spacing.72))] lg:translate-x-16 lg:translate-y-[calc(50%-2rem)]',
            )}
            {...getImgProps(image.url, image.alt, {
              widths: [375, 508, 1016],
              sizes: [
                '(max-width: 1023px) 84vw',
                '(min-width: 1024px) 35vw',
                '375px',
              ],
            })}
          />
        </div>
        <div className="col-span-full row-start-2 flex items-center md:col-span-5 md:col-start-5 md:row-start-1 lg:col-span-7 lg:col-start-6 lg:pt-16">
          <div className="w-full text-center md:text-left">
            <motion.div variants={childVariants}>
              <H3 as="h2" inverse={isDark} className="mb-4">
                {title}
              </H3>
            </motion.div>
            <motion.div variants={childVariants}>
              <p className={clsx('mb-8', isDark && 'text-gray-100')}>{text}</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center gap-4 md:items-start lg:flex-row lg:items-center"
              variants={childVariants}
            >
              {children}
              {phoneNumber ? (
                <PhoneButton
                  variant={isDark ? 'outline-inverse' : 'outline'}
                  ringOffsetColor={isDark ? 'black' : 'white'}
                >
                  {phoneNumber}
                </PhoneButton>
              ) : null}
            </motion.div>
          </div>
        </div>
      </Grid>
    </motion.div>
  )
}
