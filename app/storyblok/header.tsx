import * as React from 'react'

import { Header } from '~/components/header'
import type { HeaderBlok } from '~/types'
import { mapLink } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbHeader({ blok }: { blok: HeaderBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <Header
        logoUrl={blok.logo.filename}
        logoAlt={blok.logo.alt}
        menu={blok.menu.map(mapLink)}
      />
    </StoryBlokWrapper>
  )
}
