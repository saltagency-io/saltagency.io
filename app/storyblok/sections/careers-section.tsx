import * as React from 'react'

import { StoryblokComponent } from '@storyblok/react'

import { CareersSection } from '~/components/sections/careers-section'
import type { CareersSectionBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbCareersSection({ blok }: { blok: CareersSectionBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <CareersSection subtitle={blok.subtitle} title={blok.title}>
        {blok.actions.map((action) => (
          <StoryblokComponent
            key={action._uid}
            blok={action}
            ringOffsetColor={blok.theme === 'light' ? 'white' : 'black'}
          />
        ))}
      </CareersSection>
    </StoryBlokWrapper>
  )
}
