import { StoryblokComponent } from '@storyblok/react'

import { HeroSection } from '#app/components/sections/hero-section.tsx'
import  { type HeroBlok } from '#app/types.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbHeroSection({ blok }: { blok: HeroBlok }) {
	return (
		<StoryBlokWrapper blok={blok}>
			<HeroSection
				title={blok.title}
				body={blok.body}
				hasShapes={blok.hasShapes}
			>
				{blok.actions?.map(action => (
					<StoryblokComponent key={action._uid} blok={action} />
				))}
			</HeroSection>
		</StoryBlokWrapper>
	)
}
