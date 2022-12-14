import * as React from 'react'

import { Hero } from '~/components/hero'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbHero({ blok }: any) {
  return (
    <StoryBlokWrapper blok={blok}>
      <Hero title={blok.title} body={blok.body} />
    </StoryBlokWrapper>
  )
}
