import type * as React from 'react'

import { SbBlokData, storyblokEditable } from '@storyblok/react'

export function isPreview(request: Request) {
  const { searchParams } = new URL(request.url)
  return !!searchParams.get('_storyblok')
}

export function StoryBlokWrapper({
  children,
  blok,
}: {
  children: React.ReactNode
  blok: SbBlokData
}) {
  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      {children}
    </div>
  )
}
