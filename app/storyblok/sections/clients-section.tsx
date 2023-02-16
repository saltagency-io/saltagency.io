import type { ClientsBlok } from '../../../types'
import { ClientsSection } from '~/components/sections/clients-section'
import { mapAsset } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbClients({ blok }: { blok: ClientsBlok }) {
  return (
    <StoryBlokWrapper blok={blok} key={blok._uid}>
      <ClientsSection
        title={blok.title}
        logos={blok.logos.map((logo) => mapAsset(logo))}
      />
    </StoryBlokWrapper>
  )
}
