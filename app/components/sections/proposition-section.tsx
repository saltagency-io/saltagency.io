import * as React from 'react'

import { Link } from '@remix-run/react'

import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'

import { GradientCircle } from '../gradient-circle'
import { Grid } from '~/components/grid'
import { IconArrowRight } from '~/components/icons'
import { H3, H4, H5, Paragraph } from '~/components/typography'
import type { Section } from '~/types'

const PropostionBackground = (
  <div
    className={clsx(
      'absolute inset-0',
      'before:absolute before:inset-0 before:z-[2] before:bg-gradient-to-r before:from-transparent before:to-blue-500/10',
      'after:absolute after:inset-0 after:z-[2] after:bg-gradient-to-b after:from-transparent after:via-transparent after:to-black/40',
    )}
  >
    <GradientCircle
      top={0}
      right={-20}
      width={500}
      height={500}
      opacity={10}
      z={1}
    />
    <GradientCircle
      rotate={40}
      bottom={50}
      left={-200}
      width={700}
      height={900}
      opacity={10}
      z={1}
    />
    <svg
      className="absolute left-0 stroke-white/10"
      xmlns="http://www.w3.org/2000/svg"
      width="1440"
      height="665"
      viewBox="0 0 1440 665"
      fill="none"
    >
      <path
        d="M1864.54 -184.633C-549.935 -1070.11 891.692 706.498 -627.746 663.196"
        strokeWidth={1}
      />
    </svg>
    <svg
      className="absolute right-0 bottom-0 stroke-white/10"
      xmlns="http://www.w3.org/2000/svg"
      width="709"
      height="624"
      viewBox="0 0 709 624"
      fill="none"
    >
      <path
        d="M1238.92 148.062C51.6622 -385.127 751.738 708.678 0.962363 692.497"
        strokeWidth={1}
      />
    </svg>
  </div>
)

type Props = {
  subtitle: string
  title: string
  sections: Section[]
}

export function PropositionSection({ subtitle, title, sections }: Props) {
  const shouldReduceMotion = useReducedMotion()

  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      className="relative bg-black/80 py-20 lg:py-40"
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, margin: '-115px 0px' }}
      variants={{
        visible: {
          transition: { staggerChildren: 0.3, delay: 0.2 },
        },
      }}
    >
      {PropostionBackground}
      <Grid className="z-10">
        <motion.div className="col-span-full" variants={childVariants}>
          <H5 as="h2" variant="secondary" className="mb-4">
            {subtitle}
          </H5>
          <H3 inverse as="span" className="mb-8 lg:mb-14">
            {title}
          </H3>
        </motion.div>
        <div className="col-span-full mt-10">
          {sections.map((section) => (
            <motion.div key={section.id} variants={childVariants}>
              <Link
                to={section.link?.url ?? '#'}
                className="group"
                prefetch="intent"
              >
                <Grid
                  nested
                  className="border-secondary border-b pt-8 pb-16 transition hover:border-white focus:border-white lg:py-14"
                >
                  <div className="col-span-6">
                    <H4 inverse as="h3" className="mb-2 lg:mb-0">
                      {section.title}
                    </H4>
                    <Paragraph
                      as="div"
                      className={clsx(
                        'absolute left-0 bottom-4 flex items-center gap-x-2 lg:bottom-14',
                        'opacity-90 transition lg:translate-y-4 lg:opacity-0',
                        'lg:group-hover:translate-y-0 lg:group-hover:opacity-70',
                        'lg:group-focus:translate-y-0 lg:group-focus:opacity-70',
                      )}
                      textColorClassName="text-white"
                    >
                      <span>{section.link?.text}</span>
                      <IconArrowRight height={18} width={18} />
                    </Paragraph>
                  </div>
                  <div className="col-span-6">
                    <p className="text-2xl text-gray-100">{section.text}</p>
                  </div>
                </Grid>
              </Link>
            </motion.div>
          ))}
        </div>
      </Grid>
    </motion.div>
  )
}
