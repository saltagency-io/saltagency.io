import { CardsSection } from '~/components/sections/cards-section'
import type { CardsSectionBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbCardsSection({ blok }: { blok: CardsSectionBlok }) {
  const cards = blok.cards.map(
    ({ _uid, icon, link, title, body, transparantCards }) => ({
      id: _uid,
      icon,
      link,
      title,
      transparantCards,
      body,
    }),
  )

  return (
    <StoryBlokWrapper blok={blok}>
      <CardsSection {...blok} cards={cards} />
    </StoryBlokWrapper>
  )
}
