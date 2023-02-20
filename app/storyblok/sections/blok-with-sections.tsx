import type * as React from 'react'

import { PropositionSection } from '~/components/sections/proposition-section'
import type { BlockWithSectionsBlok, Section } from '~/types'
import { mapSection } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

enum Variant {
  Proposition = 'proposition',
  Formula = 'formula',
  ApplicationProcess = 'application-process',
}

type SectionComponent = React.ComponentType<{
  subtitle: string
  title: string
  sections: Section[]
}>

const sections: Record<Variant, SectionComponent> = {
  [Variant.Proposition]: PropositionSection,
  [Variant.Formula]: () => null,
  [Variant.ApplicationProcess]: () => null,
}

export function SbBlockWithSections({ blok }: { blok: BlockWithSectionsBlok }) {
  const Section = sections[blok.variant] ?? (
    <div>Unknown component {blok.variant}</div>
  )

  return (
    <StoryBlokWrapper blok={blok}>
      <Section
        subtitle={blok.subtitle}
        title={blok.title}
        sections={blok.sections.map(mapSection)}
      />
    </StoryBlokWrapper>
  )
}
