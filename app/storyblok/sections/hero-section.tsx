import * as React from 'react'

import { StoryblokComponent } from '@storyblok/react'

import type { HeroBlok } from '../../types'
import { HeroSection } from '~/components/sections/hero-section'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbHeroSection({ blok }: { blok: HeroBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <HeroSection title={blok.title} body={blok.body}>
        {blok.actions?.map((action) => (
          <StoryblokComponent key={action._uid} blok={action} />
        ))}
      </HeroSection>
    </StoryBlokWrapper>
  )
}
