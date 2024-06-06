import * as React from 'react'

import { Link, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { Button } from '#app/components/ui/button.tsx'
import { H1, H6 } from '#app/components/ui/typography.tsx'
import { getImgProps } from '#app/utils/images.js'
import { multilineToBreaks, unslugify } from '#app/utils/misc.js'

type Props = {
  children: React.ReactNode
  category: string
  publishedAt?: Date | string
  readTime?: number
  image?: {
    url: string
    alt: string
  }
  title: string
}

export function Story({
  children,
  title,
  category,
  publishedAt,
  readTime,
  image,
}: Props) {
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const { t, i18n } = useTranslation()

  const parts = location.pathname.slice(1).split('/')

  const language = i18n.language === 'nl' ? 'nl-NL' : 'en-US'

  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const date = publishedAt ? new Date(publishedAt) : null
  const datePosted = date
    ? date.toLocaleDateString(language, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <>
      <div className="relative z-20 mb-16 lg:mt-5">
        {image?.url && (
          <>
            <div className="bg-story-gradient-hero absolute bottom-0 left-0 z-0 h-full w-full"></div>

            <div className="circle-gradient"></div>

            <motion.img
              loading="eager"
              src="/images/story-hero-glass.svg"
              alt="Koodin waterdrops"
              className="pointer-events-none absolute left-0 top-30 z-10 hidden h-full w-full select-none object-fill lg:block"
              initial="initial"
              animate="visible"
              variants={{
                initial: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.35, ease: 'easeIn' },
                },
              }}
            />

            <img
              loading="lazy"
              className="h-[540px] w-full select-none object-cover"
              {...getImgProps(image.url, image.alt, {
                widths: [375, 724, 1200],
                sizes: [
                  '(max-width: 1023px) 100vw',
                  '(min-width: 1024px) 78vw',
                  '375px',
                ],
                transformations: {
                  quality: 95,
                },
              })}
            />
          </>
        )}

        <motion.div
          className={clsx(
            'flex w-full flex-col place-content-center items-center',
            image ? 'absolute bottom-10' : 'pt-10 sm:pt-20',
          )}
          initial="initial"
          animate="visible"
          variants={{
            initial: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {datePosted && (
            <motion.div variants={childVariants}>
              <H6 className="text-center" inverse={image ? true : undefined}>
                {datePosted}
              </H6>
            </motion.div>
          )}

          <motion.div variants={childVariants} className="m-auto max-w-4xl">
            <H1
              className="break mb-6 mt-3 text-balance text-center"
              inverse={image ? true : undefined}
            >
              {multilineToBreaks(title)}
            </H1>
          </motion.div>

          <div className="flex flex-col items-center justify-center gap-2 pt-4 lg:flex-row">
            {category && (
              <Button
                variant={image ? 'outline-inverse' : 'outline'}
                size="small"
                className="pointer-events-none relative"
              >
                {category}
              </Button>
            )}

            {readTime != null && (
              <Button
                variant={image ? 'outline-inverse' : 'outline'}
                size="small"
                className="pointer-events-none relative"
              >
                {readTime} {t('read.time')}
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-4 -mb-20 md:mx-8vw lg:-mb-40">
        <div className="relative mx-auto grid max-w-6xl grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6">
          <div className="col-span-full px-16 lg:col-span-10 lg:col-start-2">
            <Link
              to={`/${parts.slice(0, -1).join('/')}`}
              className="hover:text-primary text-secondary inline-flex items-center gap-x-2 text-base transition-all duration-200 ease-in-out"
            >
              <span className="font-bold underline">
                {unslugify(parts[parts.length - 2])}
              </span>{' '}
              / {title}
            </Link>
          </div>
        </div>
      </div>

      {children}
    </>
  )
}
