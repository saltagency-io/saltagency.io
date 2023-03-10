import * as React from 'react'

import { TeamSection } from '~/components/sections/team-section'
import type { TeamSectionBlok } from '~/types'
import { mapAsset } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbTeamSection({ blok }: { blok: TeamSectionBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <TeamSection
        subtitle={blok.subtitle}
        title={blok.title}
        members={blok.members.map((member) => ({
          ...member,
          image: mapAsset(member.image),
        }))}
      />
    </StoryBlokWrapper>
  )
}
