import { StoryblokComponent } from '@storyblok/react'
import { HeaderSection } from '~/components/sections/header-section'
import type { HeaderSectionBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbHeaderSection({ blok }: { blok: HeaderSectionBlok }) {
	return (
		<StoryBlokWrapper blok={blok}>
			<HeaderSection
				title={blok.title}
				body={blok.body}
				hasShapes={blok.hasShapes}
				hasScrollIndicator={blok.hasScrollIndicator}
			>
				{blok.cta?.map(action => (
					<StoryblokComponent key={action._uid} blok={action} />
				))}
			</HeaderSection>
		</StoryBlokWrapper>
	)
}
