import { LocationSection } from '#app/components/sections/location-section.tsx'
import type { LocationSectionBlok } from '#app/types.ts'
import { mapAsset, useLocalizedMappers } from '#app/utils/mappers.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbLocationSection({ blok }: { blok: LocationSectionBlok }) {
	const { mapLink } = useLocalizedMappers()

	const [location] = blok.location
	return (
		<StoryBlokWrapper blok={blok}>
			<LocationSection
				subtitle={blok.subtitle}
				title={blok.title}
				address={location?.address}
				image={mapAsset(blok.image)}
				officeImage={mapAsset(blok.officeImage)}
				link={mapLink(location?.directionsLink[0])}
			/>
		</StoryBlokWrapper>
	)
}
