import { TextSection } from '#app/components/sections/text-section.tsx'
import  { type TextSectionBlok } from '#app/types.ts'
import { mapAsset } from '#app/utils/mappers.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbTextSection({ blok }: { blok: TextSectionBlok }) {
	return (
		<StoryBlokWrapper blok={blok}>
			<TextSection
				subtitle={blok.subtitle}
				title={blok.title}
				body={blok.body}
				image={blok.image ? mapAsset(blok.image) : undefined}
			/>
		</StoryBlokWrapper>
	)
}
