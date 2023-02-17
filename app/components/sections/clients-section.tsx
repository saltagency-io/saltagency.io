import * as React from 'react'

import { Grid } from '~/components/grid'
import type { Image } from '~/types'

type Props = {
  logos: Image[]
}
export function ClientsSection({ logos }: Props) {
  return (
    <Grid as="section" className="py-12">
      <div className="col-span-8 col-start-3 flex items-center justify-center gap-x-12">
        {logos.map((logo) => (
          <div key={logo.id}>
            <img className="object-contain" src={logo.url} alt={logo.alt} />
          </div>
        ))}
      </div>
    </Grid>
  )
}
