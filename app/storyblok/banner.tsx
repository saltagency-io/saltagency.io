import { Banner } from '#app/components/banner.tsx'
import type { BannerBlok } from '#app/types.ts'
import { mapAsset } from '#app/utils/mappers.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbBanner({ blok }: { blok: BannerBlok }) {
	return (
		<StoryBlokWrapper blok={blok}>
			<Banner {...blok} image={mapAsset(blok.image)} />
		</StoryBlokWrapper>
	)
}
