import * as React from 'react'

import { Banner } from '~/components/banner'
import type { BannerBlok } from '~/types'
import { mapAsset } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbBanner({ blok }: { blok: BannerBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <Banner {...blok} image={mapAsset(blok.image)} />
    </StoryBlokWrapper>
  )
}
