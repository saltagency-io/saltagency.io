import * as React from 'react'

import clsx from 'clsx'

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
    <div>
      <Grid as="section" className="py-4 lg:py-8 lg:px-28">
        <div className="col-span-full">
          <Markdown
            textColor={theme.startsWith('dark') ? 'inverse' : 'primary'}
          >
            {content}
          </Markdown>
        </div>
      </Grid>
    </div>
  )
}
