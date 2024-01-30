import * as React from 'react'

import { Outlet } from '@remix-run/react'
import { StoryblokComponent } from '@storyblok/react'
import type { LayoutBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbLayout({ blok }: { blok: LayoutBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <StoryblokComponent blok={blok.navigation[0]} />
      <Outlet />
      <StoryblokComponent blok={blok.footer[0]} />
    </StoryBlokWrapper>
  )
}
