import { PeopleSection } from '~/components/sections/people-section'
import type { PeopleSectionBlok } from '~/types'
import { mapAsset } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'
import {StoryblokComponent} from "@storyblok/react";
import * as React from "react";

export function SbPeopleSection({ blok }: { blok: PeopleSectionBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <PeopleSection
        subtitle={blok.subtitle}
        title={blok.title}
        people={blok.people.map(mapAsset)}
      >
        {blok.actions.map((action) => (
          <StoryblokComponent key={action._uid} blok={action} />
        ))}
      </PeopleSection>
    </StoryBlokWrapper>
  )
}
