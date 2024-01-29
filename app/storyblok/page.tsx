import { StoryblokComponent } from '@storyblok/react'

import type { PageBlok } from '#app/types.ts'
import { GroupProvider } from '#app/utils/providers.tsx'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbPage({ blok }: { blok: PageBlok }) {
	return (
		<StoryBlokWrapper blok={blok}>
			{/* Fallback group theme provider */}
			<GroupProvider value={{ theme: 'light-white' }}>
				{blok.body?.map(nestedBlok => (
					<StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
				))}
			</GroupProvider>
		</StoryBlokWrapper>
	)
}
