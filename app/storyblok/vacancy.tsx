import * as React from 'react'

import { useRouteLoaderData } from '@remix-run/react'

import { StoryblokComponent, storyblokEditable } from '@storyblok/react'

import { Vacancy } from '~/components/vacancy'
import type { LoaderData as RootLoaderData } from '~/root'
import type { VacancyBlok } from '~/types'
import { SdJobPosting } from '~/utils/structured-data'

type Props = {
  blok: VacancyBlok
  slug: string
  publishDate: string
}

export function SbVacancy({ blok, publishDate }: Props) {
  const { requestInfo }: RootLoaderData = useRouteLoaderData('root')
  const jobDescription = blok.body.find((b) => b.component === 'jobDescription')

  const date = new Date(publishDate ?? '')
  const datePosted = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

  return (
    <div {...storyblokEditable(blok)}>
      <SdJobPosting
        title={blok.title}
        origin={requestInfo.origin}
        description={(jobDescription?.description as string) ?? ''}
        datePosted={datePosted}
      />

      <Vacancy title={blok.title} summary={blok.summary}>
        {blok.body.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </Vacancy>
    </div>
  )
}
