import { Footer } from '#app/components/footer.tsx'
import type { FooterBlok } from '#app/types.ts'
import { useLocalizedMappers } from '#app/utils/mappers.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbFooter({ blok }: { blok: FooterBlok }) {
	const { mapLink } = useLocalizedMappers()

	const [location] = blok.location

	return (
		<StoryBlokWrapper blok={blok}>
			<Footer
				menu={blok.menu.map(mapLink)}
				additionalLinks={blok.additionalLinks.map(mapLink)}
				address={location.address}
				directionsLink={mapLink(location.directionsLink[0])}
				socialText={blok.socialText}
			/>
		</StoryBlokWrapper>
	)
}
