import * as React from 'react'

import { TextSection } from '~/components/sections/text-section'
import type { TextSectionBlok } from '~/types'
import { mapAsset } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbTextSection({ blok }: { blok: TextSectionBlok }) {
	return (
		<StoryBlokWrapper blok={blok}>
			<TextSection
				subtitle={blok.subtitle}
				title={blok.title}
				body={blok.body}
				image={blok.image ? mapAsset(blok.image) : undefined}
			/>
		</StoryBlokWrapper>
	)
}
