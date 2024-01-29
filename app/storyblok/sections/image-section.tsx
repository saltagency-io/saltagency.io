import * as React from 'react'

import { ImageSection } from '~/components/sections/image-section'
import type { ImageSectionBlok } from '~/types'
import { mapAsset } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbImageSection({ blok }: { blok: ImageSectionBlok }) {
	return (
		<StoryBlokWrapper blok={blok}>
			<ImageSection image={mapAsset(blok.image)} />
		</StoryBlokWrapper>
	)
}
