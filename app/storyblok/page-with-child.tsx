import type * as React from 'react'

import { StoryblokComponent } from '@storyblok/react'

import type { PageWithChildBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbPageWithChild({
  blok,
  children,
}: {
  blok: PageWithChildBlok
  children: React.ReactNode
}) {
  return (
    <StoryBlokWrapper blok={blok}>
      {blok.topBody?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}

      {children}

      {blok.bottomBody?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </StoryBlokWrapper>
  )
}
