import { Card } from '#app/components/card.tsx'
import type { CardBlok } from '#app/types.ts'
import { useLocalizedMappers } from '#app/utils/mappers.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

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
