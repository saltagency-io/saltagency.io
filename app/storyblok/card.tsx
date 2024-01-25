import { Card } from '~/components/card'
import type { CardBlok } from '~/types'
import { mapLink, useLocalizedMappers } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbCard({ blok }: { blok: CardBlok }) {
  const { mapLink } = useLocalizedMappers()
  const { link, ...rest } = blok
  return (
    <StoryBlokWrapper blok={blok}>
      <Card {...rest} link={link && link[0] ? mapLink(link[0]) : undefined}>
        {blok.body}
      </Card>
    </StoryBlokWrapper>
  )
}
