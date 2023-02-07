import * as React from 'react'

import { RichTextSection } from '~/components/sections/rich-text'
import type { RichTextSectionBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbRichTextSection({ blok }: { blok: RichTextSectionBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <RichTextSection>{blok.body}</RichTextSection>
    </StoryBlokWrapper>
  )
}
