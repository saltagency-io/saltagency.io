import { motion, useReducedMotion } from 'framer-motion'

import { Grid } from '#app/components/grid.tsx'
import { Icon, type IconName } from '#app/components/ui/icon.tsx'
import { H3, H4, H5, Paragraph } from '#app/components/ui/typography.tsx'
import { type Section } from '#app/types.ts'

type Props = {
  subtitle: string
  title: string
  sections: Section[]
}

export function ApplicationProcessSection({
  subtitle,
  title,
  sections,
}: Props) {
  const shouldReduceMotion = useReducedMotion()

  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, margin: '-115px 0px' }}
      variants={{
        initial: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2, delay: 0.1 },
        },
      }}
    >
      <Grid>
        <motion.div
          className="col-span-full lg:col-span-3"
          variants={childVariants}
        >
          <H5 as="h2" variant="secondary" className="mb-2">
            {subtitle}
          </H5>
          <H3 className="mb-16 lg:mb-0" inverse>
            {title}
          </H3>
        </motion.div>
        <div className="col-span-full lg:col-span-8 lg:col-start-5">
          {sections.map(section => {
            return (
              <motion.div
                key={section.id}
                variants={childVariants}
                className="border-secondary border-b py-6 first:pt-0 lg:px-4 lg:py-8"
              >
                {section.icon ? (
                  <div className="mb-3 text-white">
                    <Icon name={section.icon as IconName} size="2xl" />
                  </div>
                ) : null}
                <H4 as="h3" className="mb-2" inverse>
                  {section.title}
                </H4>
                <Paragraph
                  size="xl"
                  textColorClassName="text-inverse-secondary"
                >
                  {section.text}
                </Paragraph>
              </motion.div>
            )
          })}
        </div>
      </Grid>
    </motion.div>
  )
}
