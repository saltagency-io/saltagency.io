import * as React from 'react'

import { Footer } from '~/components/footer'
import type { FooterBlok } from '~/types'
import { mapLink } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbFooter({ blok }: { blok: FooterBlok }) {
  const [location] = blok.location

  return (
    <StoryBlokWrapper blok={blok}>
      <Footer
        menu={blok.menu.map(mapLink)}
        additionalLinks={blok.additionalLinks.map(mapLink)}
        address={location.address}
        directionsLink={mapLink(location.directionsLink[0])}
        disclaimer={blok.disclaimer}
        socialText={blok.socialText}
      />
    </StoryBlokWrapper>
  )
}
