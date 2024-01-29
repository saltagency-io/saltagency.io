import React from 'react'

import { Spacer } from '~/components/spacer'
import type { SpacerBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbSpacer({ blok }: { blok: SpacerBlok }) {
	return (
		<StoryBlokWrapper blok={blok}>
			<Spacer size={blok.size} />
		</StoryBlokWrapper>
	)
}
