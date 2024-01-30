import { Spacer } from '#app/components/spacer.tsx'
import  { type SpacerBlok } from '#app/types.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbSpacer({ blok }: { blok: SpacerBlok }) {
	return (
		<StoryBlokWrapper blok={blok}>
			<Spacer size={blok.size} />
		</StoryBlokWrapper>
	)
}
