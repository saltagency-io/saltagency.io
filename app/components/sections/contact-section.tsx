import * as React from 'react'

import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'

import { PhoneButton } from '~/components/button'
import { Grid } from '~/components/grid'
import { H3, H4 } from '~/components/typography'
import type { Image } from '~/types'
import { getImgProps } from '~/utils/images'
import { useGroup } from '~/utils/providers'

const bgColorMap = ['bg-yellow-500', 'bg-pink-500', 'bg-blue-400']

function Shape() {
  const shouldReduceMotion = useReducedMotion()

  const [bgColor, setBgColor] = React.useState('bg-inverse')

  React.useEffect(() => {
    const bgColorId = Math.ceil(Math.random() * 3)
    setBgColor(bgColorMap[bgColorId - 1])
  }, [])

  return (
    <motion.div
      className="relative h-[286px]"
      initial="initial"
      animate="visible"
      viewport={{ once: true, margin: '-115px 0px' }}
      variants={{
        initial: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.75 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { delay: 0.45, duration: 0.25 },
        },
      }}
    >
      <div
        className="absolute h-[286px] w-[286px]"
        style={{ clipPath: 'circle(50% at 100% 50%)', left: '-143px' }}
      >
        <div className={`h-full w-full ${bgColor}`} />
      </div>
      <div
        className="absolute h-[286px] w-[286px]"
        style={{ clipPath: 'circle(50% at 50% 50%)', left: '133px' }}
      >
        <div className={`h-full w-full ${bgColor}`} />
      </div>
    </motion.div>
  )
}

type Props = {
  title: string
  text: string
  image?: Image
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
    <div className="py-20 lg:py-40">
      <motion.div
        initial="initial"
        animate="visible"
        viewport={{ once: true, margin: '-115px 0px' }}
        variants={{
          initial: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        <Grid className="gap-y-16 lg:gap-y-0">
          <div className="col-span-full flex items-center lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <div>
              <motion.div variants={childVariants}>
                <H3 as="h2" inverse={isDark} className="mb-4">
                  {title}
                </H3>
              </motion.div>
              <motion.div variants={childVariants}>
                <p className={clsx('mb-8', isDark && 'text-gray-100')}>
                  {text}
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col gap-4 lg:flex-row lg:items-center"
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

          <div className="col-span-full m-6 overflow-hidden rounded-full object-cover shadow-2xl lg:col-span-5 lg:col-start-1 lg:row-start-1">
            {image ? (
              <img
                {...getImgProps(image.url, image.alt, {
                  widths: [375, 508, 1016],
                  sizes: [
                    '(max-width: 1023px) 84vw',
                    '(min-width: 1024px) 35vw',
                    '375px',
                  ],
                })}
              />
            ) : (
              <Shape />
            )}
          </div>
        </Grid>
      </motion.div>
    </div>
  )
}
