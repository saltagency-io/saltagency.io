import { HeaderSection } from '#app/components/sections/header-section.tsx'
import  { type HeaderSectionBlok } from '#app/types.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbHeaderSection({ blok }: { blok: HeaderSectionBlok }) {
	return (
		<StoryBlokWrapper blok={blok}>
			<HeaderSection
				title={blok.title}
				body={blok.body}
				hasShapes={blok.hasShapes}
				hasScrollIndicator={blok.hasScrollIndicator}
			/>
		</StoryBlokWrapper>
	)
}
