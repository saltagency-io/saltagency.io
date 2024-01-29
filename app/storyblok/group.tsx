import { StoryblokComponent } from '@storyblok/react'

import { Group } from '#app/components/group.tsx'
import type { GroupBlok } from '#app/types.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbGroup({ blok }: { blok: GroupBlok }) {
	return (
		<StoryBlokWrapper blok={blok}>
			<Group theme={blok.theme}>
				{blok.content?.map(nestedBlok => (
					<StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
				))}
			</Group>
		</StoryBlokWrapper>
	)
}
