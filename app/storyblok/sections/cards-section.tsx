import { CardsSection } from '~/components/sections/cards-section'
import type { CardsSectionBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbCardsSection({ blok }: { blok: CardsSectionBlok }) {
  const cards = blok.cards.map(({ _uid, icon, title, body }) => ({
    id: _uid,
    icon,
    title,
    body,
  }))
  return (
    <StoryBlokWrapper blok={blok}>
      <CardsSection {...blok} cards={cards} />
    </StoryBlokWrapper>
  )
}
