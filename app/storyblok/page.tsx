import { StoryblokComponent } from '@storyblok/react'
import type { PageBlok } from '~/types'
import { GroupProvider } from '~/utils/providers'
import { StoryBlokWrapper } from '~/utils/storyblok'

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
