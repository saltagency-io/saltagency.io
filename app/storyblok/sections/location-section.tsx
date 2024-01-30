import { LocationSection } from '~/components/sections/location-section'
import type { LocationSectionBlok } from '~/types'
import { mapAsset, useLocalizedMappers } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

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
