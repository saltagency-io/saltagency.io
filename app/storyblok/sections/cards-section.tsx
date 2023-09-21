import { Card } from '~/components/card'
import { CardsSection } from '~/components/sections/cards-section'
import type { CardsSectionBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbCardsSection({ blok }: { blok: CardsSectionBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <CardsSection {...blok}>
        {blok.cards?.map(({ _uid, icon, title, body }) => (
          <Card
            key={_uid}
            icon={icon}
            title={title}
            variant={blok.variant === 'hero' ? 'light' : blok.variant}
          >
            {body}
          </Card>
        ))}
      </CardsSection>
    </StoryBlokWrapper>
  )
}
