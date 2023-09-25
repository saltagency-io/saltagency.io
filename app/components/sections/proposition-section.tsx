import { Link } from '@remix-run/react'

import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'

import { Grid } from '~/components/grid'
import { IconArrowRight } from '~/components/icons'
import { H3, H4, H5, Paragraph } from '~/components/typography'
import type { Section } from '~/types'

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
      className="relative py-20 lg:py-40"
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, margin: '-115px 0px' }}
      variants={{
        visible: {
          transition: { staggerChildren: 0.3, delay: 0.2 },
        },
      }}
    >
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
