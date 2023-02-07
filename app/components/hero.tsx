import type * as React from 'react'

import { Grid } from '~/components/grid'

type Props = {
  children: React.ReactNode
  title: string
  body: string
  imageUrl: string
  imageAlt: string
}

export function Hero({ children, title, body, imageUrl, imageAlt }: Props) {
  return (
    <header className="pb-12 h-auto lg:h-[800px]">
      <Grid>
        <div className="col-span-4 md:col-span-8 lg:col-span-6 pt-14 relative z-10">
          <h1 className="text-white text-5xl mb-8">{title}</h1>
          <p className="text-white text-2xl">{body}</p>
          <div className="pt-8 lg:pt-16 flex flex-col lg:flex-row gap-4 lg:gap-8">
            {children}
          </div>
        </div>
        <img
          className="hidden absolute left-[50%] md:block"
          src={imageUrl}
          alt={imageAlt}
        />
      </Grid>
    </header>
  )
}
