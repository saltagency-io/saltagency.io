import { ImageSection } from '#app/components/sections/image-section.tsx'
import  { type ImageSectionBlok } from '#app/types.ts'
import { mapAsset } from '#app/utils/mappers.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbImageSection({ blok }: { blok: ImageSectionBlok }) {
	return (
		<StoryBlokWrapper blok={blok}>
			<ImageSection image={mapAsset(blok.image)} />
		</StoryBlokWrapper>
	)
}
