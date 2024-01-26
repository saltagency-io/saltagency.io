import * as React from 'react'

import { Grid } from '~/components/grid'
import { Markdown } from '~/utils/markdown'
import { useGroup } from '~/utils/providers'

type Props = {
  content: string
  theme: 'dark' | 'light'
}

export function RichText({ content }: Props) {
  const { theme } = useGroup()
  return (
    <Grid>
      <div className="px-16 lg:col-span-10 lg:col-start-2">
        <Markdown textColor={theme.startsWith('dark') ? 'inverse' : 'primary'}>
          {content}
        </Markdown>
      </div>
    </Grid>
  )
}
