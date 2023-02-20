import * as React from 'react'

import { Grid } from '~/components/grid'
import { H2, H3, Subtitle } from '~/components/typography'

type Props = {
  subtitle: string
  title: string
  body: string
}

export function TextSection({ subtitle, title, body }: Props) {
  return (
    <Grid className="py-40">
      <div className="col-span-4 md:col-span-8 lg:col-span-10 lg:col-start-2">
        <Subtitle className="mb-4">{subtitle}</Subtitle>
        <H2 className="mb-6">{title}</H2>
        <H3 as="p" variant="secondary">
          {body}
        </H3>
      </div>
    </Grid>
  )
}
