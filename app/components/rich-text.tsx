import * as React from 'react'

import clsx from 'clsx'

import { Grid } from '~/components/grid'
import { Markdown } from '~/utils/markdown'

type Props = {
  content: string
  theme: 'dark' | 'light'
}

export function RichText({ content, theme }: Props) {
  return (
    <div
      className={clsx({
        'bg-primary': theme === 'light',
        'bg-inverse': theme === 'dark',
      })}
    >
      <Grid as="section" className="py-4 lg:py-8 lg:px-28">
        <div className="col-span-full">
          <Markdown textColor={theme === 'dark' ? 'inverse' : 'primary'}>
            {content}
          </Markdown>
        </div>
      </Grid>
    </div>
  )
}
