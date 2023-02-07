import type { ClientsBlok } from '../../../types'
import { Clients } from '~/components/sections/clients'
import { mapAsset } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbClients({ blok }: { blok: ClientsBlok }) {
  return (
    <StoryBlokWrapper blok={blok} key={blok._uid}>
      <Clients
        title={blok.title}
        logos={blok.logos.map((logo) => mapAsset(logo))}
      />
    </StoryBlokWrapper>
  )
}
