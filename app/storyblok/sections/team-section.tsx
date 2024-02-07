import * as React from 'react'

import { TeamSection } from '#app/components/sections/team-section.tsx'
import { type TeamSectionBlok } from '#app/types.ts'
import { mapAsset } from '#app/utils/mappers.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbTeamSection({ blok }: { blok: TeamSectionBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <TeamSection
        subtitle={blok.subtitle}
        title={blok.title}
        members={blok.members.map(member => ({
          ...member,
          image: mapAsset(member.image),
        }))}
      />
    </StoryBlokWrapper>
  )
}
