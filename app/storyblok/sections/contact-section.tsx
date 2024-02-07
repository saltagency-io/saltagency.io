import { StoryblokComponent } from '@storyblok/react'

import { ContactSection } from '#app/components/sections/contact-section.tsx'
import { type ContactSectionBlok } from '#app/types.ts'
import { mapAsset } from '#app/utils/mappers.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbContactSection({ blok }: { blok: ContactSectionBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <ContactSection {...blok} image={mapAsset(blok.image)}>
        {blok.actions?.map(action => (
          <StoryblokComponent
            key={action._uid}
            blok={action}
            ringOffsetColor={blok.theme === 'light' ? 'white' : 'black'}
          />
        ))}
      </ContactSection>
    </StoryBlokWrapper>
  )
}
