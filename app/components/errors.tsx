import * as React from 'react'

import { useLocation, useMatches } from '@remix-run/react'

import clsx from 'clsx'
import errorStack from 'error-stack-parser'
import { motion } from 'framer-motion'

import { ButtonLink } from '~/components/button'
import { Grid } from '~/components/grid'
import { IconArrowDown } from '~/components/icons'
import { H1, H2, H3, H4, H5, H6, Subtitle } from '~/components/typography'
import { VacancyList } from '~/components/vacancy-list'
import type { Vacancy } from '~/types'
import {
  defaultLanguage,
  getLanguageFromPath,
  getStaticLabel,
  isSupportedLanguage,
} from '~/utils/i18n'
import { useLocalizedMappers } from '~/utils/mappers'
import { useVacancies } from '~/utils/providers'

function RedBox({ error }: { error: Error }) {
  const [isVisible, setIsVisible] = React.useState(true)
  const frames = errorStack.parse(error)

  return (
    <div
      className={clsx(
        'fixed inset-0 z-10 flex items-center justify-center transition',
        {
          'pointer-events-none opacity-0': !isVisible,
        },
      )}
    >
      <button
        className="absolute inset-0 block h-full w-full bg-black opacity-75"
        onClick={() => setIsVisible(false)}
      />
      <div className="border-lg text-primary mx-5vw max-h-75vh relative my-16 overflow-y-auto rounded-lg bg-red-500 p-12">
        <H2>{error.message}</H2>
        <div>
          {frames.map((frame) => (
            <div
              key={[frame.fileName, frame.lineNumber, frame.columnNumber].join(
                '-',
              )}
              className="pt-4"
            >
              <H6 as="div" className="pt-2">
                {frame.functionName}
              </H6>
              <div className="font-mono opacity-75">
                {frame.fileName}:{frame.lineNumber}:{frame.columnNumber}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

type ErrorSectionProps = {
  title: string
  subtitle: string
  ctaText: string
}

export function ErrorSection({ title, subtitle, ctaText }: ErrorSectionProps) {
  const location = useLocation()
  const language = getLanguageFromPath(location.pathname)

  console.log({ language })

  return (
    <div className="py-40">
      <Grid>
        <div className="col-span-full text-center lg:col-span-8 lg:col-start-3">
          <H1 className="mb-16" variant="primary" inverse>
            {title}
          </H1>
          <H4 className="mb-10" variant="secondary" inverse>
            {subtitle}
          </H4>
          <ButtonLink
            className="mx-auto"
            ringOffsetColor="black"
            to={language === defaultLanguage ? '/' : `/${language}`}
          >
            {ctaText}
          </ButtonLink>
        </div>
      </Grid>
    </div>
  )
}

export function ErrorPage({
  error,
  errorSectionProps,
  vacancies,
}: {
  error?: Error
  errorSectionProps: ErrorSectionProps
  vacancies?: Vacancy[]
}) {
  const location = useLocation()
  const language = getLanguageFromPath(location.pathname)

  React.useEffect(() => {
    document.body.classList.add('header-light')

    return () => {
      document.body.classList.remove('header-light')
    }
  }, [])

  return (
    <>
      <noscript>
        <div
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: 30,
          }}
        >
          <h1 style={{ fontSize: '2em' }}>{errorSectionProps.title}</h1>
          <small>
            Also, this site works much better with JavaScript enabled...
          </small>
        </div>
      </noscript>
      <main className="relative">
        <div className="bg-gradient fixed top-0 bottom-0 left-0 right-0 z-0" />

        {error && process.env.NODE_ENV === 'development' ? (
          <RedBox error={error} />
        ) : null}

        <ErrorSection {...errorSectionProps} />

        {vacancies ? (
          <div className="pb-20 lg:pb-40">
            <Grid>
              <div className="col-span-full flex pb-56">
                <H5
                  as="div"
                  className="mx-auto inline-flex items-center gap-x-2"
                  variant="secondary"
                  inverse
                >
                  {getStaticLabel('404.more', language)}
                  <motion.div
                    animate={{
                      y: [0, -5, 5, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    <IconArrowDown />
                  </motion.div>
                </H5>
              </div>

              <div className="col-span-4 md:col-span-8 lg:col-span-5">
                <Subtitle variant="pink" className="mb-4">
                  {getStaticLabel('404.careers.subtitle', language)}
                </Subtitle>
                <H3 as="h2" inverse className="mb-14 lg:mb-12">
                  {getStaticLabel('404.careers.title', language)}
                </H3>
              </div>
              <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
                <VacancyList
                  theme="light"
                  vacancies={vacancies}
                  transition={false}
                />
              </div>
            </Grid>
          </div>
        ) : null}
      </main>
    </>
  )
}

export function NotFoundError() {
  const matches = useMatches()
  const { vacancies } = useVacancies()
  const { mapVacancy } = useLocalizedMappers()
  const location = useLocation()

  const language = getLanguageFromPath(location.pathname)
  const last = matches[matches.length - 1]
  const pathname = last?.pathname

  return (
    <ErrorPage
      vacancies={vacancies.map(mapVacancy)}
      errorSectionProps={{
        title: getStaticLabel('404.title', language),
        subtitle: `${getStaticLabel('404.subtitle', language)} "${pathname}"`,
        ctaText: getStaticLabel('404.cta', language),
      }}
    />
  )
}

export function ServerError({ error }: { error?: Error }) {
  const matches = useMatches()
  const location = useLocation()

  const language = getLanguageFromPath(location.pathname)
  const last = matches[matches.length - 1]
  const pathname = last?.pathname

  return (
    <ErrorPage
      error={error}
      errorSectionProps={{
        title: getStaticLabel('500.title', language),
        subtitle: `${getStaticLabel('500.subtitle', language)} "${pathname}"`,
        ctaText: getStaticLabel('500.cta', language),
      }}
    />
  )
}
