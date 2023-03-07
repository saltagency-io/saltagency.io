import type * as React from 'react'

import { AccordionSection } from '~/components/sections/accordion-section'
import { ApplicationProcessSection } from '~/components/sections/application-section'
import { FormulaSection } from '~/components/sections/formula-section'
import { PropositionSection } from '~/components/sections/proposition-section'
import type { BlockWithSectionsBlok, Section } from '~/types'
import { mapSection } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

enum Variant {
  Proposition = 'proposition',
  Formula = 'formula',
  OurOffer = 'our-offer',
  ApplicationProcess = 'application-process',
  Accordion = 'accordion',
}

type SectionComponent = React.ComponentType<{
  subtitle: string
  title: string
  sections: Section[]
}>

const sections: Record<Variant, SectionComponent> = {
  [Variant.Proposition]: PropositionSection,
  [Variant.Formula]: FormulaSection,
  [Variant.OurOffer]: FormulaSection, // Re-use formula section as they're identical in terms of design
  [Variant.ApplicationProcess]: ApplicationProcessSection,
  [Variant.Accordion]: AccordionSection,
}

export function SbBlockWithSections({ blok }: { blok: BlockWithSectionsBlok }) {
  const Section = sections[blok.variant]
  return (
    <StoryBlokWrapper blok={blok}>
      {Section ? (
        <Section
          subtitle={blok.subtitle}
          title={blok.title}
          sections={blok.sections.map(mapSection)}
        />
      ) : (
        <div>Unknown component {blok.variant}</div>
      )}
    </StoryBlokWrapper>
  )
}
