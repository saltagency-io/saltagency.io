import { motion, useReducedMotion } from 'framer-motion'

import { Grid } from '#app/components/grid.tsx'
import { H3, H4, H5, Paragraph } from '#app/components/typography.tsx'
import { type Image } from '#app/types.ts'
import { getImgProps } from '#app/utils/images.ts'

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
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, margin: '-115px 0px' }}
      variants={{
        visible: {
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      <Grid className="z-10 gap-y-10">
        <motion.div className="col-span-full mb-10" variants={childVariants}>
          <H5 as="h2" className="mb-4" variant="secondary">
            {subtitle}
          </H5>
          <H3 inverse>{title}</H3>
        </motion.div>
        <div className="col-span-full grid grid-cols-1 gap-6 filter md:grid-cols-2">
          {members.map(member => (
            <motion.div
              key={member.name}
              variants={childVariants}
              className="flex flex-col"
            >
              <img
                loading="lazy"
                className="block aspect-[5/4] w-full rounded-t-3xl object-cover"
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

              <div className="flex grow flex-col gap-6 rounded-b-3xl border border-white/5 bg-white/1 p-4 backdrop-blur-md lg:p-6">
                <div>
                  <H4 inverse>{member.name}</H4>
                  <Paragraph
                    as="span"
                    size="xl"
                    textColorClassName="text-gray-100/70"
                  >
                    {member.role}
                  </Paragraph>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {member.skills.split(',').map(skill => (
                    <span
                      key={skill}
                      className="whitespace-nowrap rounded-full bg-purple-400 px-2 py-1 text-white"
                    >
                      #{skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Grid>
    </motion.div>
  )
}
