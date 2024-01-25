import { motion, useReducedMotion } from 'framer-motion'

import { GradientCircle } from '~/components/gradient-circle'
import { Grid } from '~/components/grid'
import { ScrollIndicator } from '~/components/scroll-indicator'
import { H1 } from '~/components/typography'

type Props = {
  title: string
  hasShapes: boolean
  hasScrollIndicator: boolean
  body?: string
}

export function HeaderSection({
  title,
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
          src="/images/rain-drops-background.svg"
          className="absolute left-0 top-0 w-screen select-none object-fill"
          initial="initial"
          animate="visible"
          variants={{
            initial: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, delay: 0.3, ease: 'easeInOut' },
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

            {hasScrollIndicator ? (
              <motion.div
                className="mx-auto mt-24 flex w-fit items-center justify-center lg:justify-start"
                variants={childVariants}
              >
                <ScrollIndicator />
              </motion.div>
            ) : null}
          </motion.div>
        </Grid>
      </div>
    </>
  )
}
