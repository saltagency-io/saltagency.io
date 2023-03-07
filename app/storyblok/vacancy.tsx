import * as React from 'react'

import { StoryblokComponent, storyblokEditable } from '@storyblok/react'

import { Vacancy } from '~/components/vacancy'
import type { VacancyBlok } from '~/types'

type Props = {
  blok: VacancyBlok
  slug: string
}

export function SbVacancy({ blok, slug }: Props) {
  return (
    <main {...storyblokEditable(blok)}>
      <Vacancy title={blok.title} summary={blok.summary} slug={slug}>
        {blok.body.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </Vacancy>
    </main>
  )
}
