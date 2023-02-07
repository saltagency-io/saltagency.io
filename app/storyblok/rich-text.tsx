import * as React from 'react'

import { Markdown } from '~/utils/markdown'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbRichText({ blok }: { blok: any }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <Markdown>{blok.body}</Markdown>
    </StoryBlokWrapper>
  )
}
