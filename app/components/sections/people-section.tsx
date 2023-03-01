import * as React from 'react'

import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Grid } from '~/components/grid'
import { H3, Subtitle } from '~/components/typography'
import type { Image } from '~/types'

type Props = {
  subtitle: string
  title: string
  people: Image[]
}

export function PeopleSection({ subtitle, title, people }: Props) {
  const { scrollYProgress } = useScroll()
  const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 120])
  const translateYNegative = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0, -120],
  )

  return (
    <div className="bg-secondary py-20 lg:py-40">
      <Grid>
        <motion.div
          className="col-span-4 md:col-span-8 lg:col-span-5"
          initial="initial"
          whileInView="visible"
          viewport={{ once: true, margin: '100px' }}
          variants={{
            initial: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.25, delay: 0.1 } },
          }}
        >
          <Subtitle variant="gray" className="mb-4">
            {subtitle}
          </Subtitle>
          <H3 as="h2" className="opacity-80">
            {title}
          </H3>
        </motion.div>
        <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
          <Grid
            nested
            className="grid-rows-12 h-[472px] gap-y-6 pt-10 lg:h-[754px]"
          >
            {people.map((person, i) => (
              <motion.div
                key={person.id}
                style={{
                  y: (i + 1) % 2 === 0 ? translateYNegative : translateY,
                  backgroundImage: `url(${person.url})`,
                }}
                className={clsx(
                  'col-span-2 row-span-6 md:col-span-4 lg:col-span-6',
                  'overflow-hidden rounded-lg bg-cover bg-bottom',
                  {
                    'row-start-1': i === 0,
                    'row-start-2': i === 1,
                  },
                )}
              />
            ))}
          </Grid>
        </div>
      </Grid>
    </div>
  )
}
