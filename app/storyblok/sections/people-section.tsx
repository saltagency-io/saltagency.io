import { StoryblokComponent } from '@storyblok/react'

import { PeopleSection } from '#app/components/sections/people-section.tsx'
import { type PeopleSectionBlok } from '#app/types.ts'
import { mapAsset } from '#app/utils/mappers.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbPeopleSection({ blok }: { blok: PeopleSectionBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <PeopleSection
        subtitle={blok.subtitle}
        title={blok.title}
        people={blok.people.map(mapAsset)}
      >
        {blok.actions.map(action => (
          <StoryblokComponent key={action._uid} blok={action} />
        ))}
      </PeopleSection>
    </StoryBlokWrapper>
  )
}
