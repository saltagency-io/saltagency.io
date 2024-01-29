import * as React from 'react'

import { StoryblokComponent } from '@storyblok/react'
import { ContactSection } from '~/components/sections/contact-section'
import type { ContactSectionBlok } from '~/types'
import { mapAsset } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbContactSection({ blok }: { blok: ContactSectionBlok }) {
	return (
		<StoryBlokWrapper blok={blok}>
			<ContactSection {...blok} image={mapAsset(blok.image)}>
				{blok.actions?.map(action => (
					<StoryblokComponent
						key={action._uid}
						blok={action}
						ringOffsetColor={blok.theme === 'light' ? 'white' : 'black'}
					/>
				))}
			</ContactSection>
		</StoryBlokWrapper>
	)
}
