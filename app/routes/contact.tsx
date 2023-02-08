import * as React from 'react'

import { Grid } from '~/components/grid'
import { H1, H3, Paragraph } from '~/components/typography'
import { useLabels } from '~/utils/labels-provider'

export default function ContactPage() {
  const { t } = useLabels()

  return (
    <main>
      <Grid>
        <div className="col-span-6 col-start-4">
          <H1 className="mb-10">{t('contact.title')}</H1>
          <H3 className="mb-4">{t('contact.subtitle')}</H3>
          <Paragraph>{t('contact.text')}</Paragraph>
        </div>
      </Grid>
    </main>
  )
}
