import * as React from 'react'

import { Grid } from '~/components/grid'
import { H2 } from '~/components/typography'
import type { Image } from '~/types'

type Props = {
  title: string
  logos: Image[]
}
export function Clients({ title, logos }: Props) {
  return (
    <Grid as="section" className="py-8">
      <H2 className="col-span-full mb-8 text-center">{title}</H2>
      {logos.map((logo) => (
        <div key={logo.id} className="col-span-4 lg:col-span-3">
          <img
            className="aspect-[3/2] w-[100%] object-contain"
            src={logo.url}
            alt={logo.alt}
          />
        </div>
      ))}
    </Grid>
  )
}
