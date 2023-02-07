import type * as React from 'react'

import { Grid } from '~/components/grid'
import { Markdown } from '~/utils/markdown'

export function RichTextSection({ children }: { children: string }) {
  return (
    <Grid as="section" className="py-8">
      <div className="col-span-full">
        <Markdown>{children}</Markdown>
      </div>
    </Grid>
  )
}
