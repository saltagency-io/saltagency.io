import { StoriesSection } from '#app/components/sections/stories-section.tsx'
import { type StoriesSectionBlok } from '#app/types.ts'
import { useLocalizedMappers } from '#app/utils/mappers.js'
import { useGroup, useStories } from '#app/utils/providers.js'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbStoriesSection({ blok }: { blok: StoriesSectionBlok }) {
  const { stories } = useStories()
  const { mapStories } = useLocalizedMappers()

  return (
    <StoryBlokWrapper blok={blok}>
      <StoriesSection stories={stories.map(mapStories)} />
    </StoryBlokWrapper>
  )
}
