import type * as React from 'react'

import { Grid } from '~/components/grid'
import { Paragraph } from '~/components/typography'
import { Markdown } from '~/utils/markdown'

type Props = {
  disclaimer: string
  socialText: string
}

export function Footer({ disclaimer, socialText }: Props) {
  return (
    <footer className="bg-gray-900 py-10 lg:py-16">
      <Grid>
        <div className="col-span-full flex flex-col-reverse justify-between lg:flex-row lg:items-center">
          <Paragraph
            className="opacity-40"
            textColorClassName="text-white"
            size="sm"
          >
            {disclaimer}
          </Paragraph>
          <div className="mb-6 lg:mb-0">
            <Markdown textColor="inverse" margins={false}>
              {socialText}
            </Markdown>
          </div>
        </div>
      </Grid>
    </footer>
  )
}
