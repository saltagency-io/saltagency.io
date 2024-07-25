import { lazy, Suspense } from 'react'

import { Link } from '@remix-run/react'
import { type Asset } from '#types/storyblok.js'
import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Markdown from 'react-markdown'

import { GradientCircle } from '#app/components/gradient-circle.tsx'
import { Grid } from '#app/components/grid.tsx'
import { H1 } from '#app/components/ui/typography.tsx'
import { useGroup } from '#app/utils/providers.js'

const ScrollIndicator = lazy(() =>
  import('#app/components/scroll-indicator.tsx').then(
    ({ ScrollIndicator }) => ({ default: ScrollIndicator }),
  ),
)

type Props = {
  title: string
  hasShapes: boolean
  hasScrollIndicator: boolean
  body?: string
  duration?: number
  logo?: Asset
  deliverables?: string
  website?: {
    url: string
  }
}

export function CaseHeaderSection({
  title,
  body,
  hasShapes,
  hasScrollIndicator,
  duration,
  logo,
  deliverables,
  website,
}: Props) {
  const { theme } = useGroup()
  const isDark = theme.startsWith('dark')
  const shouldReduceMotion = useReducedMotion()
  const { t } = useTranslation()

  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <>
      {hasShapes ? (
        <motion.img
          loading="eager"
          alt="Koodin waterdrops"
          src="/images/case-class-drops-background.svg"
          className="absolute left-0 top-40 hidden w-screen select-none object-fill lg:block"
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
      ) : null}
      <div className="relative">
        <GradientCircle
          className="mx-auto block lg:hidden"
          opacity={15}
          height={666}
          width={666}
          top={170}
          left={1}
          right={1}
        />
        <GradientCircle
          className="mx-auto hidden border border-red-500 lg:block"
          opacity={15}
          height={920}
          width={920}
          top={-60}
          left={-40}
          right={1}
        />

        <Grid as="header" className="relative z-10 mt-20 gap-y-10">
          <motion.div
            className="col-span-full lg:col-span-9"
            initial="initial"
            animate="visible"
            variants={{
              initial: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.div variants={childVariants}>
              <H1 inverse={isDark} className="mb-4 lg:mb-10">
                {title}
              </H1>
            </motion.div>
            {body ? (
              <motion.div variants={childVariants}>
                <p
                  className={clsx(
                    'lg:text-2xl',
                    isDark ? 'text-[#DCDBF1]' : null,
                  )}
                >
                  {body}
                </p>
              </motion.div>
            ) : null}
          </motion.div>
          <motion.div
            className="col-span-full lg:col-span-3"
            initial="initial"
            animate="visible"
            variants={{
              initial: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            <div className="space-y-4 rounded-lg bg-[#161423] bg-opacity-80 p-5 py-7 text-[#DCDBF1]">
              {logo ? (
                <img
                  src={logo.filename}
                  loading="lazy"
                  className="h-full w-40"
                />
              ) : null}

              {deliverables ? (
                <div className="w-full border-t-[1px] border-[#474557] py-3">
                  <strong className="text-white">Deliverables</strong>
                  <div className="mt-1.5 leading-relaxed">
                    <Markdown>{deliverables}</Markdown>
                  </div>
                </div>
              ) : null}

              {duration ? (
                <div className="w-full border-t-[1px] border-[#474557] py-3">
                  {duration} {t('months')}
                </div>
              ) : null}

              {website ? (
                <div className="w-full border-t-[1px] border-[#474557] pt-2">
                  <Link
                    to={website.url}
                    target="_blank"
                    rel="noopener"
                    className="underline"
                  >
                    {website.url.replace(/^https?:\/\//, '')}
                  </Link>
                </div>
              ) : null}
            </div>
          </motion.div>

          {hasScrollIndicator ? (
            <motion.div
              className="col-span-full mx-auto mt-24 flex w-fit items-center justify-center lg:justify-start"
              variants={childVariants}
            >
              <Suspense fallback={null}>
                <ScrollIndicator />
              </Suspense>
            </motion.div>
          ) : null}
        </Grid>
      </div>
    </>
  )
}
