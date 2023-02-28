import * as React from 'react'

import { TextSection } from '~/components/sections/text-section'
import type { TextSectionBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbTextSection({ blok }: { blok: TextSectionBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <TextSection
        subtitle={blok.subtitle}
        title={blok.title}
        body={blok.body}
      />
    </StoryBlokWrapper>
  )
}
