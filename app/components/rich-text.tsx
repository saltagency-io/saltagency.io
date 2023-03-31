import * as React from 'react'

import { Grid } from '~/components/grid'
import { Markdown } from '~/utils/markdown'

type Props = {
  content: string
  theme: 'dark' | 'light'
}

export function RichText({ content, theme }: Props) {
  return (
    <Grid as="section" className="py-4 lg:py-8 lg:px-28">
      <div className="col-span-full">
        <Markdown>{content}</Markdown>
      </div>
    </Grid>
  )
}
