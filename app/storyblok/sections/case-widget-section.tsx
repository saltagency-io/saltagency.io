import { CaseWidgetSection } from '#app/components/sections/case-widget-section.js'
import { type CaseWidgetSectionBlok } from '#app/types.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbCaseWidgetSection({ blok }: { blok: CaseWidgetSectionBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <CaseWidgetSection cases={blok.cases} />
    </StoryBlokWrapper>
  )
}
