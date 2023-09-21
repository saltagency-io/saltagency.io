import type { PropsWithChildren } from 'react'

import clsx from 'clsx'

import { H3, H5, Paragraph } from '../typography'

export type CardSectionVariant = 'light' | 'dark' | 'hero'

type Props = {
  sectionTitle: string
  bodyTitle?: string
  body?: string
  variant?: CardSectionVariant
}
export function CardsSection({
  sectionTitle,
  bodyTitle,
  body,
  variant = 'light',
  children,
}: PropsWithChildren<Props>) {
  return (
    <section
      className={clsx(
        'relative z-20 px-8vw',
        variant === 'hero' &&
          'bg-[image:linear-gradient(180deg,rgb(0_0_0/0)_0%,rgb(0_0_0/0)_60%,white_60%,white_100%)]',
      )}
    >
      <H5 as="h2" variant="secondary">
        {sectionTitle}
      </H5>
      {bodyTitle && <H3 as="h2">{bodyTitle}</H3>}
      {body && <Paragraph>{body}</Paragraph>}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {children}
      </div>
    </section>
  )
}
