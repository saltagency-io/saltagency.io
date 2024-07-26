import { useEffect, useRef, useState } from 'react'

import { Link } from '@remix-run/react'
import { Asset, Link as CaseLink } from '#types/storyblok.js'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'

import { Grid } from '#app/components/grid.tsx'
import { getImgProps } from '#app/utils/images.js'
import { Markdown } from '#app/utils/markdown.js'

import { Icon } from '../ui/icon'
import { Paragraph } from '../ui/typography'

type Case = {
  _uid: string
  color: string
  intro: string
  content: string
  image: Asset
  link: CaseLink
  logo: Asset
  tab_logo: Asset
}

type Props = {
  cases: Case[]
}

export function CaseWidgetSection({ cases }: Props) {
  const [selectedTab, setSelectedTab] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const startTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setSelectedTab(prevTab => (prevTab + 1) % cases.length)
      startTimeout()
    }, 7000)
  }

  useEffect(() => {
    startTimeout()
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [cases.length])

  const handleTabClick = (index: number) => {
    setSelectedTab(index)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    startTimeout()
  }

  return (
    <>
      <Grid>
        <motion.div
          className="col-span-full"
          initial="initial"
          whileInView="visible"
          viewport={{ once: true, margin: '-115px 0px' }}
          variants={{
            initial: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2, delay: 0.1, duration: 0.6 },
            },
          }}
        >
          <motion.img
            loading="eager"
            alt="Koodin waterdrops"
            src="/images/shapes-cases.svg"
            className="absolute -left-[20rem] -top-14 hidden w-screen max-w-[350px] select-none object-fill lg:block"
            initial="initial"
            animate="visible"
            variants={{
              initial: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.35, ease: 'easeIn' },
              },
            }}
          />

          {cases.length > 1 ? (
            <ul className="grid w-full grid-cols-4">
              {cases.map((item, index) => (
                <li
                  key={item._uid}
                  className={clsx(
                    'group relative flex cursor-pointer place-content-center border border-b-0 border-[#DCDBF1] px-1.5 py-3 md:px-8 md:py-5',
                    index === selectedTab ? 'border-solid' : 'border-dashed',
                  )}
                  onClick={() => handleTabClick(index)}
                >
                  <span
                    className="absolute -top-[1px] left-0 z-10 h-[1px]"
                    style={{
                      width: index === selectedTab ? '100%' : '0%',
                      backgroundColor: item.color,
                      transition:
                        index === selectedTab ? 'width 7s linear' : 'none',
                    }}
                  />
                  <img
                    src={item.tab_logo.filename}
                    alt={item.tab_logo.alt}
                    className={clsx(
                      'transition-all duration-200 ease-in-out',
                      index === selectedTab ? 'grayscale-0' : 'grayscale',
                    )}
                  />
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-4 md:mt-8">
            <AnimatePresence>
              <motion.div
                key={cases[selectedTab]._uid}
                className="relative grid h-full w-full grid-cols-12 items-start gap-x-5 gap-y-8 overflow-hidden"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, position: 'absolute' },
                  visible: {
                    position: 'relative',
                    opacity: 1,
                    transition: { duration: 0.6, ease: 'easeInOut' },
                  },
                }}
              >
                <div className="the-case-content order-2 col-span-full lg:order-1 lg:col-span-3">
                  {cases[selectedTab].content ? (
                    <Markdown>{cases[selectedTab].content}</Markdown>
                  ) : null}
                </div>

                <div className="relative order-1 col-span-full lg:order-2 lg:col-span-9">
                  <Link
                    className="group group relative flex h-full min-h-[230px] w-full flex-col items-center overflow-hidden rounded-2xl bg-black/50 object-cover md:aspect-video"
                    to={`/${cases[selectedTab].link.story?.full_slug}`}
                  >
                    <div
                      className="bg-gradient absolute left-0 top-0 z-10 h-full w-full"
                      style={{
                        backgroundImage: `radial-gradient(147.22% 165.72% at 3.57% 107.56%, #4353ff 0%, #4353ff 22.99%, rgba(254, 84, 84, 0) 90%)`,
                      }}
                    />
                    {cases[selectedTab].image && (
                      <img
                        className="absolute left-0 top-0 z-0 h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:rotate-1 group-hover:scale-105"
                        {...getImgProps(
                          cases[selectedTab].image.filename,
                          cases[selectedTab].image.alt,
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
                    )}
                    <div className="absolute bottom-6 left-6 z-10 space-y-4">
                      {cases[selectedTab].logo && (
                        <div className="relative flex">
                          <img
                            className="relative"
                            src={cases[selectedTab].logo.filename}
                            alt={cases[selectedTab].logo.alt}
                          />
                          <span className="relative z-10 transition-all duration-300 ease-in-out md:relative md:-right-2 md:opacity-0 md:group-hover:-right-3 md:group-hover:opacity-100">
                            <Icon
                              name="chevron-right"
                              size="sm"
                              className="text-white"
                            />
                          </span>
                        </div>
                      )}
                      {cases[selectedTab].intro && (
                        <Paragraph
                          textColorClassName="text-white"
                          className="!max-w-[440px] text-sm leading-relaxed"
                        >
                          {cases[selectedTab].intro}
                        </Paragraph>
                      )}
                    </div>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </Grid>
    </>
  )
}
