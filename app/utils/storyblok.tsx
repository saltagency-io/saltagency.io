import type * as React from 'react'

import { SbBlokData, storyblokEditable } from '@storyblok/react'

import { usePreviewState } from '~/utils/providers'

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
  const { preview } = usePreviewState()

  if (preview) {
    return (
      <div {...storyblokEditable(blok)} key={blok._uid}>
        {children}
      </div>
    )
  }

  return <>{children}</>
}
