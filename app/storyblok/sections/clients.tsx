import type { ClientsBlok } from '../../../types'
import { Clients } from '~/components/sections/clients'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbClients({ blok }: { blok: ClientsBlok }) {
  return (
    <StoryBlokWrapper blok={blok} key={blok._uid}>
      <Clients
        title={blok.title}
        logos={blok.logos.map((logo) => ({
          id: logo.id.toString(),
          url: logo.filename,
          alt: logo.alt,
        }))}
      />
    </StoryBlokWrapper>
  )
}
