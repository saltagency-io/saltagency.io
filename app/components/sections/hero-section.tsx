import { motion, useReducedMotion } from 'framer-motion'
import RainDrops from 'public/images/rain-drops-background.svg'

import { IconKeepScrolling } from '../icons'
import { GradientCircle } from '~/components/gradient-circle'
import { Grid } from '~/components/grid'
import { H1, Intro } from '~/components/typography'
import { multilineToBreaks } from '~/utils/misc'

type HeroSectionProps = {
  heroWithShapes: boolean
  title: string
  body: string
  children: React.ReactNode
}

export function HeroSection({
  children,
  title,
  body,
  heroWithShapes,
}: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion()

  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <>
      {heroWithShapes && (
        <motion.img
          src={RainDrops}
          className="absolute top-0 left-0 object-fill w-screen h-screen select-none"
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
      )}

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
      <Grid as="header">
        <motion.div
          className="col-span-4 md:col-span-8 lg:col-span-12"
          initial="initial"
          animate="visible"
          variants={{
            initial: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.div variants={childVariants}>
            <H1 className="mb-6 text-center break">
              {multilineToBreaks(title)}
            </H1>
          </motion.div>

          <motion.div variants={childVariants}>
            <Intro className="block text-center">{body}</Intro>
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center gap-4 pt-10 lg:flex-row lg:gap-6"
            variants={childVariants}
          >
            {children}
          </motion.div>

          <motion.div
            className="flex items-center justify-center mx-auto mt-14 w-fit lg:justify-start"
            variants={childVariants}
          >
            <IconKeepScrolling />
          </motion.div>
        </motion.div>
      </Grid>
    </>
  )
}
