import { CardsSection } from '#app/components/sections/cards-section.tsx'
import type { CardsSectionBlok } from '#app/types.ts'
import { useLocalizedMappers } from '#app/utils/mappers.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbCardsSection({ blok }: { blok: CardsSectionBlok }) {
	const { mapLink } = useLocalizedMappers()

	const cards = blok.cards.map(({ _uid, icon, link, title, body }) => {
		return {
			id: _uid,
			icon,
			title,
			link: link && link[0] ? mapLink(link[0]) : undefined,
			body,
		}
	})

	return (
		<StoryBlokWrapper blok={blok}>
			<CardsSection {...blok} cards={cards} />
		</StoryBlokWrapper>
	)
}
