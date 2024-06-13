import { CaseHeaderSection } from '#app/components/sections/case-header-section.tsx'
import { type CaseHeaderSectionBlok } from '#app/types.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbCaseHeaderSection({ blok }: { blok: CaseHeaderSectionBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <CaseHeaderSection
        title={blok.title}
        body={blok.body}
        hasShapes={blok.hasShapes}
        hasScrollIndicator={blok.hasScrollIndicator}
        deliverables={blok.deliverables}
        logo={blok.logo}
        duration={blok.duration}
        website={blok.website}
      />
    </StoryBlokWrapper>
  )
}
