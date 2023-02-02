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
    <header className="h-[830px]">
      <Grid>
        <div className="col-span-6 pt-14">
          <h1 className="text-white text-5xl mb-8">{title}</h1>
          <p className="text-white text-2xl">{body}</p>
          <div className="pt-16 flex gap-x-8">{children}</div>
        </div>
        <img className="absolute left-[50%]" src={imageUrl} alt={imageAlt} />
      </Grid>
    </header>
  )
}
