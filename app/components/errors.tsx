import * as React from 'react'

import { type ErrorResponse } from '@remix-run/node'
import {
  isRouteErrorResponse,
  useLocation,
  useMatches,
  useParams,
  useRouteError,
} from '@remix-run/react'
import { captureRemixErrorBoundaryError } from '@sentry/remix'
import clsx from 'clsx'
import errorStack from 'error-stack-parser'
import { motion } from 'framer-motion'

import { ButtonLink } from '#app/components/button.tsx'
import { Grid } from '#app/components/grid.tsx'
import { IconArrowDown } from '#app/components/icons.tsx'
import { H1, H2, H3, H4, H5, H6 } from '#app/components/typography.tsx'
import { VacancyList } from '#app/components/vacancy-list.tsx'
import { type Vacancy } from '#app/types.ts'
import {
  defaultLanguage,
  getLanguageFromPath,
  getStaticLabel,
} from '#app/utils/i18n'
import { useLocalizedMappers } from '#app/utils/mappers'
import { getErrorMessage } from '#app/utils/misc.tsx'
import { useVacancies } from '#app/utils/providers'

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
          {frames.map(frame => (
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
        <div className="bg-gradient fixed bottom-0 left-0 right-0 top-0 z-0" />

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
                  variant="primary"
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
                <H5 as="h2" variant="secondary" className="mb-4">
                  {getStaticLabel('404.careers.subtitle', language)}
                </H5>
                <H3 inverse className="mb-14 lg:mb-12">
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

export function ServerError() {
  const matches = useMatches()
  const location = useLocation()

  const language = getLanguageFromPath(location.pathname)
  const last = matches[matches.length - 1]
  const pathname = last?.pathname

  return (
    <ErrorPage
      errorSectionProps={{
        title: getStaticLabel('500.title', language),
        subtitle: `${getStaticLabel('500.subtitle', language)} "${pathname}"`,
        ctaText: getStaticLabel('500.cta', language),
      }}
    />
  )
}

type StatusHandler = (info: {
  error: ErrorResponse
  params: Record<string, string | undefined>
}) => JSX.Element | null

export function GeneralErrorBoundary({
  defaultStatusHandler = ({ error }) => (
    <p>
      {error.status} {error.data}
    </p>
  ),
  statusHandlers,
  unexpectedErrorHandler = error => <p>{getErrorMessage(error)}</p>,
}: {
  defaultStatusHandler?: StatusHandler
  statusHandlers?: Record<number, StatusHandler>
  unexpectedErrorHandler?: (error: unknown) => JSX.Element | null
}) {
  const error = useRouteError()
  captureRemixErrorBoundaryError(error)
  const params = useParams()

  if (typeof document !== 'undefined') {
    console.error(error)
  }

  return (
    <>
      {isRouteErrorResponse(error)
        ? (statusHandlers?.[error.status] ?? defaultStatusHandler)({
            error,
            params,
          })
        : unexpectedErrorHandler(error)}
    </>
  )
}
