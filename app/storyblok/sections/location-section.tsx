import { LocationSection } from '~/components/sections/location-section'
import type { LocationSectionBlok } from '~/types'
import { mapAsset, mapLink } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbLocationSection({ blok }: { blok: LocationSectionBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <LocationSection
        subtitle={blok.subtitle}
        title={blok.title}
        address={blok.address}
        image={mapAsset(blok.image)}
        imageMobile={mapAsset(blok.imageMobile)}
        link={mapLink(blok.links[0])}
      />
    </StoryBlokWrapper>
  )
}
