import { ClientsSection } from '~/components/sections/clients-section'
import type { ClientsBlok } from '~/types'
import { mapAsset } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbClients({ blok }: { blok: ClientsBlok }) {
	return (
		<StoryBlokWrapper blok={blok} key={blok._uid}>
			<ClientsSection logos={blok.logos.map(mapAsset)} />
		</StoryBlokWrapper>
	)
}
