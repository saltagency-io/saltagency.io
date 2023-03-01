import * as React from 'react'

import type { SbBlokData } from '@storyblok/react'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'

import { Vacancy } from '~/components/vacancy'
import type { BodyComponents } from '~/types'

type Blok = SbBlokData & {
  title: string
  summary: string
  body: BodyComponents[]
}

export function SbVacancy({ blok, slug }: { blok: Blok; slug: string }) {
  return (
    <main {...storyblokEditable(blok)}>
      <Vacancy title={blok.title} summary={blok.summary} slug={slug}>
        {blok.body?.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </Vacancy>
    </main>
  )
}
