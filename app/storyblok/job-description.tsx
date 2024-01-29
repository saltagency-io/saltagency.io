import * as React from 'react'

import { JobDescription } from '~/components/job-description'
import type { JobDescriptionBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbJobDescription({ blok }: { blok: JobDescriptionBlok }) {
	return (
		<StoryBlokWrapper blok={blok}>
			<JobDescription
				description={blok.description}
				requirements={blok.requirements}
			/>
		</StoryBlokWrapper>
	)
}
