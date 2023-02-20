import type * as React from 'react'

import { Gradient } from '~/components/gradient'
import { Grid } from '~/components/grid'
import { H1, H4 } from '~/components/typography'

type Props = {
  children: React.ReactNode
  title: string
  body: string
}

export function HeroSection({ children, title, body }: Props) {
  return (
    <div className="relative">
      <Gradient className="top-[111px] -left-[410px]" />
      <Grid as="header" className="pb-48 pt-24">
        <div className="col-span-8 col-start-3">
          <H1 className="mb-6 text-center">{title}</H1>
          <H4
            as="h2"
            className="px-32 text-center text-3xl"
            variant="secondary"
          >
            {body}
          </H4>
          <div className="mx-auto flex flex-col justify-center gap-4 pt-8 lg:flex-row lg:gap-6 lg:pt-10">
            {children}
          </div>
        </div>
      </Grid>
      <Gradient className="top-[111px] -right-[545px]" />
    </div>
  )
}
