import * as React from 'react'

import { Navbar } from '~/components/navbar'
import type { NavigationBlok } from '~/types'
import { useLocalizedMappers } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbNavigation({ blok }: { blok: NavigationBlok }) {
  const { mapLink } = useLocalizedMappers()

  return (
    <StoryBlokWrapper blok={blok}>
      <Navbar menu={blok.menu.map(mapLink)} />
    </StoryBlokWrapper>
  )
}
