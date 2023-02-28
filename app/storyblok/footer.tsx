import * as React from 'react'

import { Footer } from '~/components/footer'
import type { FooterBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbFooter({ blok }: { blok: FooterBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <Footer disclaimer={blok.disclaimer} socialText={blok.socialText} />
    </StoryBlokWrapper>
  )
}
