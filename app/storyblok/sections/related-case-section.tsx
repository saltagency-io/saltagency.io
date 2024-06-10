import { RelatedCaseSection } from '#app/components/sections/related-case-section.js'
import { type RelatedCasesSectionBlock } from '#app/types.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbRelatedCaseSection({
  blok,
}: {
  blok: RelatedCasesSectionBlock
}) {
  return (
    <StoryBlokWrapper blok={blok}>
      <RelatedCaseSection cases={blok.cases} title={blok.title} />
    </StoryBlokWrapper>
  )
}
