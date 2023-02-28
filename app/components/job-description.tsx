import * as React from 'react'

import { Grid } from '~/components/grid'
import { H3, Subtitle } from '~/components/typography'
import { useLabels } from '~/utils/labels-provider'
import { Markdown } from '~/utils/markdown'

type Props = {
  description: string
  requirements: string
}

export function JobDescription({ description, requirements }: Props) {
  const { t } = useLabels()

  return (
    <Grid className="pb-4 pt-16 lg:pb-20 lg:pt-40">
      <div className="col-span-full mb-6 lg:mb-14 lg:border-b lg:border-gray-300 lg:pb-6">
        <Subtitle className="mb-4">
          {t('vacancy.description.subtitle')}
        </Subtitle>
        <H3>{t('vacancy.description.title')}</H3>
      </div>
      <div className="col-span-full lg:col-span-6">
        <Markdown bodyTextSize="xl">{description}</Markdown>
      </div>
      <div className="col-span-full lg:col-span-6">
        <Markdown bodyTextSize="xl">{requirements}</Markdown>
      </div>
    </Grid>
  )
}
