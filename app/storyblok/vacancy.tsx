import { StoryblokComponent, storyblokEditable } from '@storyblok/react'

import { Vacancy } from '#app/components/vacancy.tsx'
import { type VacancyBlok } from '#app/types.ts'
import { GroupProvider } from '#app/utils/providers.tsx'

type Props = {
  blok: VacancyBlok
}

export function SbVacancy({ blok }: Props) {
  return (
    <div {...storyblokEditable(blok)}>
      <GroupProvider value={{ theme: 'light-white' }}>
        <Vacancy title={blok.title} summary={blok.summary}>
          {blok.body.map(nestedBlok => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </Vacancy>
      </GroupProvider>
    </div>
  )
}
