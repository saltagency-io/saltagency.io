import { Card } from '~/components/card'
import type { CardBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbCard({ blok }: { blok: CardBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <Card {...blok}>{blok.body}</Card>
    </StoryBlokWrapper>
  )
}
