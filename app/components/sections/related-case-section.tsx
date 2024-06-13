import { Link } from '@remix-run/react'
import { Asset, Link as CaseLink } from '#types/storyblok.js'
import { motion, useReducedMotion } from 'framer-motion'

import { Grid } from '#app/components/grid.tsx'
import { H4, Paragraph } from '#app/components/ui/typography.tsx'
import { getImgProps } from '#app/utils/images.js'

import { Icon } from '../ui/icon'

type Case = {
  _uid: string
  link: CaseLink
  color: string
  logo: Asset
  image: Asset
  intro: string
}

type Props = {
  cases: Case[]
  title: string
}

export function RelatedCaseSection({ cases, title }: Props) {
  const shouldReduceMotion = useReducedMotion()

  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <>
      <Grid>
        <motion.div
          className="col-span-full space-y-14"
          initial="initial"
          whileInView="visible"
          viewport={{ once: true, margin: '-115px 0px' }}
          variants={{
            initial: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.25, delay: 0.1 } },
          }}
        >
          {title ? (
            <H4 as="h2" inverse>
              {title}
            </H4>
          ) : null}

          <motion.div
            className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2"
            variants={childVariants}
          >
            {cases.map(singleCase => (
              <motion.div
                key={singleCase._uid}
                className="relative flex aspect-video flex-col items-center space-x-4 overflow-hidden rounded-2xl bg-black/50 object-cover"
                whileHover={{ scale: 1.03, cursor: 'pointer' }}
              >
                <Link
                  className="group block h-full w-full"
                  to={`/${singleCase.link.story?.full_slug}`}
                >
                  <div
                    className="absolute left-0 top-0 z-10 h-full w-full"
                    style={{
                      backgroundImage: `radial-gradient(166.98% 89.73% at 50% 103.12%, ${singleCase.color} 0%, ${singleCase.color} 22.99%, rgba(254, 84, 84, 0.00) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)`,
                    }}
                  />

                  {singleCase.logo ? (
                    <div className="relative left-4 top-4 z-10 flex">
                      <img
                        className="relative"
                        src={singleCase.logo.filename}
                        alt={singleCase.logo.alt}
                      />
                      <span className="relative z-10 transition-all duration-300 ease-in-out md:relative md:-right-2 md:opacity-0 md:group-hover:-right-3 md:group-hover:opacity-100">
                        <Icon
                          name="chevron-right"
                          size="sm"
                          className="text-white"
                        />
                      </span>
                    </div>
                  ) : null}

                  {singleCase.image ? (
                    <img
                      className="absolute left-0 top-0 z-0 h-full w-full"
                      {...getImgProps(
                        singleCase.image.filename,
                        singleCase.image.alt,
                        {
                          widths: [475, 508, 1016],
                          sizes: [
                            '(max-width: 1023px) 84vw',
                            '(min-width: 1024px) 35vw',
                            '375px',
                          ],
                        },
                      )}
                    />
                  ) : null}

                  {singleCase.intro ? (
                    <div className="absolute bottom-4 left-4 z-10">
                      <Paragraph
                        textColorClassName="text-white"
                        className="text-sm"
                      >
                        {singleCase.intro}
                      </Paragraph>
                    </div>
                  ) : null}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Grid>
    </>
  )
}
