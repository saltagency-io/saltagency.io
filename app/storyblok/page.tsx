import { StoryblokComponent } from '@storyblok/react'

import type { PageBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbPage({ blok }: { blok: PageBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </StoryBlokWrapper>
  )
}
