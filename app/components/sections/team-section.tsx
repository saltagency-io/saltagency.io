import * as React from 'react'

import { motion, useReducedMotion } from 'framer-motion'

import { Grid } from '~/components/grid'
import { H3, H4, Paragraph, Subtitle } from '~/components/typography'
import type { Image } from '~/types'
import { getImgProps } from '~/utils/images'

type Member = {
  name: string
  role: string
  image: Image
  skills: string
}

type Props = {
  subtitle: string
  title: string
  members: Member[]
}

export function TeamSection({ subtitle, title, members }: Props) {
  const shouldReduceMotion = useReducedMotion()

  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      id="team"
      className="bg-inverse py-20 lg:py-40"
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, margin: '-115px 0px' }}
      variants={{
        visible: {
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      <Grid className="gap-y-10">
        <motion.div className="col-span-full mb-10" variants={childVariants}>
          <Subtitle className="mb-4" variant="pink">
            {subtitle}
          </Subtitle>
          <H3 as="h2" inverse>
            {title}
          </H3>
        </motion.div>
        {members.map((member) => (
          <motion.div
            key={member.name}
            variants={childVariants}
            className="bg-transparent-light col-span-full overflow-hidden rounded-lg lg:col-span-6"
          >
            <img
              className="aspect-[5/4] w-full object-cover"
              {...getImgProps(member.image.url, member.image.alt, {
                widths: [375, 425, 506],
                sizes: [
                  '(max-width: 1023px) 84vw',
                  '(min-width: 1024px) 35vw',
                  '375px',
                ],
                transformations: {
                  quality: 100,
                },
              })}
            />

            <div className="relative flex min-h-[260px] flex-col px-4 py-6 lg:px-10 lg:pt-12 lg:pb-8">
              <H4 className="mb-2" as="h3" inverse>
                {member.name}
              </H4>
              <Paragraph
                as="span"
                size="xl"
                textColorClassName="text-inverse-secondary"
              >
                {member.role}
              </Paragraph>
              <div className="mt-auto flex flex-wrap items-center gap-x-4">
                {member.skills.split(',').map((skill) => (
                  <Paragraph
                    key={skill}
                    as="span"
                    size="xl"
                    textColorClassName="text-inverse-secondary"
                    className="whitespace-nowrap"
                  >
                    #{skill}
                  </Paragraph>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </Grid>
    </motion.div>
  )
}
