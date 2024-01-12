import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'

import { Grid } from '~/components/grid'
import { H3, H5 } from '~/components/typography'
import type { Image } from '~/types'
import { getImgProps } from '~/utils/images'
import { useGroup } from '~/utils/providers'

type Props = {
  subtitle: string
  title: string
  body: string
  image?: Image
}

export function TextSection({ subtitle, title, body, image }: Props) {
  const { theme } = useGroup()
  const isDark = theme.startsWith('dark')
  const shouldReduceMotion = useReducedMotion()

  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
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
          <H5 as="h2" className="mb-4" variant="secondary">
            {subtitle}
          </H5>
        </motion.div>
        <motion.div variants={childVariants}>
          <H3 className="mb-6" inverse={isDark}>
            {title}
          </H3>
        </motion.div>
        <motion.div variants={childVariants}>
          <p className={clsx('text-2xl', isDark && 'text-gray-100')}>{body}</p>
        </motion.div>
        {image?.url ? (
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
  )
}
