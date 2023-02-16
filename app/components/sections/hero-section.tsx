import type * as React from 'react'

import { Grid } from '~/components/grid'

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
        <h1 className="mb-8 text-5xl text-white">{title}</h1>
        <p className="text-2xl text-white">{body}</p>
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
