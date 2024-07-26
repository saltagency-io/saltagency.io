import { Link } from '@remix-run/react'
import { Story } from '#types/index.js'
import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { H4, Paragraph } from '#app/components/ui/typography.tsx'
import { getImgProps } from '#app/utils/images.ts'

type Props = {
  stories: Story[]
}

export function StoriesSection({ stories }: Props) {
  const shouldReduceMotion = useReducedMotion()
  const { i18n } = useTranslation()
  const language = i18n.language === 'nl' ? 'nl-NL' : 'en-US'

  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      id="stories"
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, margin: '-115px 0px' }}
      variants={{
        visible: {
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      <div className="grid grid-cols-12 place-content-start gap-2 p-2">
        {stories
          .sort(
            (a, b) =>
              new Date(b.content.published_at).getTime() -
              new Date(a.content.published_at).getTime(),
          )

          .map((story, index: number) => {
            const date = new Date(story.content.published_at)

            const datePosted = date.toLocaleDateString(language, {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })

            const getWidthClass = (index: number): string => {
              const widthClasses = [
                '', // Index 0
                'col-span-full md:col-span-6 lg:col-span-8', // Index 1
                'col-span-full md:col-span-6 lg:col-span-4', // Index 2
                'col-span-full md:col-span-6 lg:col-span-3', // Index 3
                'col-span-full md:col-span-6 lg:col-span-6', // Index 4
                'col-span-full md:col-span-6 lg:col-span-3', // Index 5
                'col-span-full md:col-span-6 lg:col-span-6', // Index 6
                'col-span-full md:col-span-6 lg:col-span-6', // Index 7
                'col-span-full md:col-span-6 lg:col-span-2 min-h-[360px]', // Index 8
                'col-span-full md:col-span-6 lg:col-span-2 min-h-[360px]', // Index 9
                'col-span-full md:col-span-6 lg:col-span-2 min-h-[360px]', // Index 10
                'col-span-full md:col-span-6', // Index 11
              ]

              const classIndex = index % widthClasses.length

              return widthClasses[classIndex]
            }

            const widthClass = getWidthClass(index + 1)

            return (
              <motion.article
                variants={childVariants}
                key={story.id}
                className={clsx(
                  'group relative max-h-[474px] overflow-hidden rounded-3xl',
                  widthClass,
                )}
              >
                <Link to={`/${story.slug}`}>
                  <figure className="aspect-square h-full w-full overflow-hidden lg:aspect-auto">
                    {story.content.image ? (
                      <img
                        loading="lazy"
                        className="block h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:rotate-1 group-hover:scale-105"
                        {...getImgProps(
                          story.content?.image?.filename,
                          story.content?.image?.alt,
                          {
                            widths: [375, 508, 1016],
                            sizes: [
                              '(max-width: 1023px) 84vw',
                              '(min-width: 1024px) 35vw',
                              '375px',
                            ],
                            transformations: {
                              quality: 100,
                            },
                          },
                        )}
                      />
                    ) : null}
                  </figure>

                  <div className="group">
                    <div className="absolute bottom-0 left-0 z-auto h-full w-full bg-black/20"></div>
                    <div className="absolute bottom-0 left-0 z-auto h-full w-full bg-story-gradient-card opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100"></div>
                  </div>

                  <div
                    className={clsx(
                      'absolute bottom-0 p-4 text-white lg:p-7',
                      parseInt(widthClass.slice(-1)) >= 6 &&
                        story.content.intro &&
                        'grid grid-cols-12 items-end lg:gap-4',
                    )}
                  >
                    <div className="col-span-full lg:col-span-7">
                      <Paragraph
                        as="time"
                        textColorClassName="text-white"
                        className="font-bold"
                      >
                        {datePosted}
                      </Paragraph>
                      <H4 className="py-2 -tracking-[0.96px]" inverse>
                        {story.content.title}
                      </H4>
                    </div>

                    <div className="col-span-full lg:col-span-5">
                      <Paragraph
                        size="md"
                        className="line-clamp-2 md:line-clamp-3 xl:line-clamp-4"
                        textColorClassName="text-white"
                      >
                        {story.content.intro}
                      </Paragraph>
                    </div>
                  </div>
                </Link>
              </motion.article>
            )
          })}
      </div>
    </motion.div>
  )
}
