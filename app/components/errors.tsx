import * as React from 'react'

import { useMatches } from '@remix-run/react'

import clsx from 'clsx'
import errorStack from 'error-stack-parser'

import { ButtonLink } from '~/components/button'
import { Grid } from '~/components/grid'
import { H2, H3, H4, H6 } from '~/components/typography'

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
}

export function ErrorSection({ title, subtitle }: ErrorSectionProps) {
  return (
    <div className="py-40">
      <div className="fixed top-0 bottom-0 left-0 right-0 z-0 bg-gradient" />
      <Grid>
        <div className="col-span-full text-center lg:col-span-8 lg:col-start-3">
          <H3 className="mb-4" variant="primary" inverse>
            {title}
          </H3>
          <H4 className="mb-10" variant="secondary" inverse>
            {subtitle}
          </H4>
          <ButtonLink className="mx-auto" to="/">
            Take me home
          </ButtonLink>
        </div>
      </Grid>
    </div>
  )
}

export function ErrorPage({
  error,
  errorSectionProps,
}: {
  error?: Error
  errorSectionProps: ErrorSectionProps
}) {
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
        {error && process.env.NODE_ENV === 'development' ? (
          <RedBox error={error} />
        ) : null}

        <ErrorSection {...errorSectionProps} />
      </main>
    </>
  )
}

// TODO: add jobs
export function NotFoundError() {
  const matches = useMatches()
  const last = matches[matches.length - 1]
  const pathname = last?.pathname

  return (
    <ErrorPage
      errorSectionProps={{
        title: '404',
        subtitle: `We searched everywhere but we couldn't find "${pathname}"`,
      }}
    />
  )
}

export function ServerError({ error }: { error?: Error }) {
  const matches = useMatches()
  const last = matches[matches.length - 1]
  const pathname = last?.pathname

  return (
    <ErrorPage
      error={error}
      errorSectionProps={{
        title: '500',
        subtitle: `500 - Oops, something went terribly wrong on "${pathname}". Sorry about that!`,
      }}
    />
  )
}
