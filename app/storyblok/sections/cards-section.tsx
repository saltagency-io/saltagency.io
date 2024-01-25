import { CardsSection } from '~/components/sections/cards-section'
import type { CardsSectionBlok } from '~/types'
import { useLocalizedMappers } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbCardsSection({ blok }: { blok: CardsSectionBlok }) {
  const { mapLink } = useLocalizedMappers()

  const cards = blok.cards.map(({ _uid, icon, link, title, body }) => {
    return {
      id: _uid,
      icon,
      title,
      link: link ? mapLink(link[0]) : undefined,
      body,
    }
  })

  return (
    <StoryBlokWrapper blok={blok}>
      <CardsSection {...blok} cards={cards} />
    </StoryBlokWrapper>
  )
}
