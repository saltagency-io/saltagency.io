import { ClientsSection } from '#app/components/sections/clients-section.tsx'
import type { ClientsBlok } from '#app/types.ts'
import { mapAsset } from '#app/utils/mappers.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbClients({ blok }: { blok: ClientsBlok }) {
	return (
		<StoryBlokWrapper blok={blok} key={blok._uid}>
			<ClientsSection logos={blok.logos.map(mapAsset)} />
		</StoryBlokWrapper>
	)
}
