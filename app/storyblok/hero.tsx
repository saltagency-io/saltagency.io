import * as React from 'react'

import { StoryblokComponent } from '@storyblok/react'

import type { HeroBlok } from '../../types'
import { Hero } from '~/components/hero'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbHero({ blok }: { blok: HeroBlok }) {
  const actions = [...blok.primaryAction, ...blok.secondaryAction]

  return (
    <StoryBlokWrapper blok={blok}>
      <Hero
        title={blok.title}
        body={blok.body}
        imageUrl={blok.image.filename}
        imageAlt={blok.image.alt}
      >
        {actions.map((actionBlok) => (
          <StoryblokComponent key={actionBlok._uid} blok={actionBlok} />
        ))}
      </Hero>
    </StoryBlokWrapper>
  )
}
