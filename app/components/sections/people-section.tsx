import type * as React from 'react'

import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Grid } from '~/components/grid'
import { H3, Subtitle } from '~/components/typography'
import type { Image } from '~/types'
import { getImgProps } from '~/utils/images'

type Props = {
  children: React.ReactNode
  subtitle: string
  title: string
  people: Image[]
}

export function PeopleSection({ children, subtitle, title, people }: Props) {
  const { scrollYProgress } = useScroll()
  const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 100])
  const translateYNegative = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0, -190],
  )

  return (
    <div className="bg-secondary py-20 lg:py-40">
      <Grid>
        <motion.div
          className="col-span-4 mb-8 md:col-span-8 lg:col-span-5 lg:mb-0"
          initial="initial"
          whileInView="visible"
          viewport={{ once: true, margin: '-115px 0px' }}
          variants={{
            initial: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.25, delay: 0.1 } },
          }}
        >
          <Subtitle variant="gray" className="mb-4">
            {subtitle}
          </Subtitle>
          <H3 as="h2" className="mb-12 opacity-80">
            {title}
          </H3>
          <div className="hidden lg:block">{children}</div>
        </motion.div>
        <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
          <Grid
            nested
            className="grid-rows-12 h-[554px] gap-y-6 pt-10 md:h-[762px]"
          >
            {people.map((person, i) => (
              <motion.div
                key={person.id}
                style={{
                  y: (i + 1) % 2 === 0 ? translateYNegative : translateY,
                }}
                className={clsx(
                  'col-span-2 row-span-6 md:col-span-4 lg:col-span-6',
                  'overflow-hidden rounded-lg',
                  {
                    'row-start-1': i === 0,
                    'row-start-2': i === 1,
                  },
                )}
              >
                <img
                  className="rounded-lg object-contain"
                  {...getImgProps(person.url, person.alt, {
                    widths: [160, 200, 484],
                    sizes: [
                      '(max-width:639px) 10rem',
                      '(min-width:640px) and (max-width:1023px) 12.5rem',
                      '(min-width:1024px) 20rem',
                      '160px',
                    ],
                  })}
                />
              </motion.div>
            ))}
          </Grid>
        </div>
      </Grid>
    </div>
  )
}
