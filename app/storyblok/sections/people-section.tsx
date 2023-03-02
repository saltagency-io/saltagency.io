import { PeopleSection } from '~/components/sections/people-section'
import type { PeopleSectionBlok } from '~/types'
import { mapAsset } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbPeopleSection({ blok }: { blok: PeopleSectionBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <PeopleSection
        subtitle={blok.subtitle}
        title={blok.title}
        people={blok.people.map(mapAsset)}
      />
    </StoryBlokWrapper>
  )
}
