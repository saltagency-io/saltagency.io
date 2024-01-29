import type * as React from 'react'

import { StoryblokComponent } from '@storyblok/react'

import type { PageWithChildBlok } from '#app/types.ts'
import { GroupProvider } from '#app/utils/providers.tsx'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbPageWithChild({
	blok,
	children,
}: {
	blok: PageWithChildBlok
	children: React.ReactNode
}) {
	return (
		<StoryBlokWrapper blok={blok}>
			{/* Fallback group theme provider */}
			<GroupProvider value={{ theme: 'light-white' }}>
				{blok.topBody?.map(nestedBlok => (
					<StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
				))}

				{children}

				{blok.bottomBody?.map(nestedBlok => (
					<StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
				))}
			</GroupProvider>
		</StoryBlokWrapper>
	)
}
