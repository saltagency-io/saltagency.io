import { JobDescription } from '#app/components/job-description.tsx'
import { type JobDescriptionBlok } from '#app/types.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbJobDescription({ blok }: { blok: JobDescriptionBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <JobDescription
        description={blok.description}
        requirements={blok.requirements}
      />
    </StoryBlokWrapper>
  )
}
