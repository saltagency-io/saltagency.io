import type * as React from 'react'

import { Grid } from '~/components/grid'
import { H1, Paragraph } from '~/components/typography'

type Props = {
  children: React.ReactNode
  title: string
  body: string
  imageUrl: string
  imageAlt: string
}

export function HeroSection({ children, title, body, imageUrl, imageAlt }: Props) {
  return (
    <Grid as="header" className="h-auto pb-12 lg:h-[800px]">
      <div className="relative z-10 col-span-4 md:col-span-8 lg:col-span-6 lg:pt-16">
        <H1 className="mb-8">{title}</H1>
        <Paragraph className="text-3xl">{body}</Paragraph>
        <div className="flex flex-col gap-4 pt-8 lg:flex-row lg:gap-8 lg:pt-16">
          {children}
        </div>
      </div>
      <img
        className="absolute left-[50%] hidden md:block"
        src={imageUrl}
        alt={imageAlt}
      />
    </Grid>
  )
}
