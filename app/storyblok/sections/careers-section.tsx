import { StoryblokComponent } from '@storyblok/react'

import { CareersSection } from '#app/components/sections/careers-section.tsx'
import  { type CareersSectionBlok } from '#app/types.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbCareersSection({ blok }: { blok: CareersSectionBlok }) {
	return (
		<StoryBlokWrapper blok={blok}>
			<CareersSection subtitle={blok.subtitle} title={blok.title}>
				{blok.actions.map(action => (
					<StoryblokComponent
						key={action._uid}
						blok={action}
						ringOffsetColor={blok.theme === 'light' ? 'white' : 'black'}
					/>
				))}
			</CareersSection>
		</StoryBlokWrapper>
	)
}
