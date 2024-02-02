
import { StoryblokComponent } from '@storyblok/react'
import { Group } from '~/components/group'
import type { GroupBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbGroup({ blok }: { blok: GroupBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <Group hasComponentSpacing={!blok.disableComponentSpacing} theme={blok.theme}>
        {blok.content?.map(nestedBlok => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </Group>
    </StoryBlokWrapper>
  )
}
