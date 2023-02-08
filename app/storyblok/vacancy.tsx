import * as React from 'react'

import type { SbBlokData } from '@storyblok/react'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'

import type { RichTextBlok } from '../../types'
import { Vacancy } from '~/components/vacancy'

type Blok = SbBlokData & {
  title: string
  summary: string
  body: RichTextBlok[] | undefined
}

// TODO: figure out why this is not working in storyblok
export function SbVacancy({ blok }: { blok: Blok }) {
  return (
    <main {...storyblokEditable(blok)}>
      <Vacancy title={blok.title} summary={blok.summary}>
        {blok.body?.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </Vacancy>
    </main>
  )
}
