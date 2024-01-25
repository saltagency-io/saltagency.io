import { StoryblokComponent } from '@storyblok/react'

import { HeroSection } from '~/components/sections/hero-section'
import type { HeroBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbHeroSection({ blok }: { blok: HeroBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <HeroSection
        title={blok.title}
        body={blok.body}
        hasShapes={blok.hasShapes}
      >
        {blok.actions?.map((action) => (
          <StoryblokComponent key={action._uid} blok={action} />
        ))}
      </HeroSection>
    </StoryBlokWrapper>
  )
}
