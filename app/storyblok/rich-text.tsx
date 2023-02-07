import * as React from 'react'

import type { RichTextBlok } from '~/types'
import { Markdown } from '~/utils/markdown'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbRichText({ blok }: { blok: RichTextBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <Markdown>{blok.body}</Markdown>
    </StoryBlokWrapper>
  )
}
