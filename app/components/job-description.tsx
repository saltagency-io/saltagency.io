import { Grid } from '#app/components/grid.tsx'
import { H3, H5 } from '#app/components/typography.tsx'
import { useLabels } from '#app/utils/labels-provider.tsx'
import { Markdown } from '#app/utils/markdown.tsx'

type Props = {
  description: string
  requirements: string
}

export function JobDescription({ description, requirements }: Props) {
  const { t } = useLabels()

  return (
    <Grid>
      <div className="col-span-full mb-6 lg:mb-14 lg:pb-6">
        <H5 as="h2" className="mb-4" variant="secondary">
          {t('vacancy.description.subtitle')}
        </H5>
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
