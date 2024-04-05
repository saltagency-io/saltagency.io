import { lazy, Suspense } from 'react'

import { motion, useReducedMotion } from 'framer-motion'

import { GradientCircle } from '#app/components/gradient-circle.tsx'
import { Grid } from '#app/components/grid.tsx'
import { H1 } from '#app/components/ui/typography.tsx'

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
  children: React.ReactNode
}

export function HeaderSection({
  title,
  children,
  body,
  hasShapes,
  hasScrollIndicator,
}: Props) {
  const shouldReduceMotion = useReducedMotion()

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
          src="/images/rain-drops-background.svg"
          className="absolute left-0 top-0 hidden w-screen select-none object-fill lg:block"
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
        {/*Mobile*/}
        <GradientCircle
          className="mx-auto block lg:hidden"
          opacity={15}
          height={666}
          width={666}
          top={170}
          left={1}
          right={1}
        />
        {/*Desktop*/}
        <GradientCircle
          className="mx-auto hidden border border-red-500 lg:block"
          opacity={15}
          height={920}
          width={920}
          top={-60}
          left={-40}
          right={1}
        />

        <Grid as="header" className="relative z-10">
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
            {body ? (
              <motion.div className="lg:px-32" variants={childVariants}>
                <p className="lg:text-center lg:text-2xl">{body}</p>
              </motion.div>
            ) : null}
            <div className="mt-8 flex justify-center">{children}</div>

            {hasScrollIndicator ? (
              <motion.div
                className="mx-auto mt-24 flex w-fit items-center justify-center lg:justify-start"
                variants={childVariants}
              >
                <Suspense fallback={null}>
                  <ScrollIndicator />
                </Suspense>
              </motion.div>
            ) : null}
          </motion.div>
        </Grid>
      </div>
    </>
  )
}
