import * as React from 'react'

import { Footer } from '~/components/footer'
import type { FooterBlok } from '~/types'
import { mapLink } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbFooter({ blok }: { blok: FooterBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <Footer
        logoUrl={blok.logo.filename}
        logoAlt={blok.logo.alt}
        disclaimer={blok.disclaimer}
        menu={blok.menu.map(mapLink)}
        legalLinks={blok.legalLinks.map(mapLink)}
      />
    </StoryBlokWrapper>
  )
}
