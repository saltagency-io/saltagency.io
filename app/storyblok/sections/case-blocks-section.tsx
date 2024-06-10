import { CaseBlocksSection } from '#app/components/sections/case-blocks-section.js'
import { type CaseBlocksSectionBlok } from '#app/types.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbCaseBlocksSection({ blok }: { blok: CaseBlocksSectionBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <CaseBlocksSection
        blockImageFirst={blok.block_image_first}
        blockTitleFirst={blok.block_title_first}
        blockImageSecond={blok.block_image_second}
        blockTitleSecond={blok.block_title_second}
        blockVideoId={blok.video_id}
        blockVideoImage={blok.video_image}
        blockVideoTitle={blok.video_title}
        blockContent={blok.content}
      />
    </StoryBlokWrapper>
  )
}
