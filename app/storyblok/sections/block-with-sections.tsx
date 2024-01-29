import type * as React from 'react'

import { AccordionSection } from '#app/components/sections/accordion-section.tsx'
import { ApplicationProcessSection } from '#app/components/sections/application-section.tsx'
import { FormulaSection } from '#app/components/sections/formula-section.tsx'
import { PropositionSection } from '#app/components/sections/proposition-section.tsx'
import type { BlockWithSectionsBlok, Section } from '#app/types.ts'
import { useLocalizedMappers } from '#app/utils/mappers.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

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
	const { mapSection } = useLocalizedMappers()

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
