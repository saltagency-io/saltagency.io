import * as React from 'react'

import { StoryblokComponent } from '@storyblok/react'

import type { CareersSectionBlok } from '~/types'
import { CareersSection } from '~/components/sections/careers-section'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbCareersSection({ blok }: { blok: CareersSectionBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <CareersSection
        subtitle={blok.subtitle}
        title={blok.title}
        theme={blok.theme}
      >
        {blok.actions.map((action) => (
          <StoryblokComponent key={action._uid} blok={action} />
        ))}
      </CareersSection>
    </StoryBlokWrapper>
  )
}
