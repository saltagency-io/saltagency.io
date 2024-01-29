import { Quote } from '#app/components/quote.tsx'
import type { QuoteBlok } from '#app/types.ts'
import { mapAsset } from '#app/utils/mappers.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbQuote({ blok }: { blok: QuoteBlok }) {
	return (
		<StoryBlokWrapper blok={blok}>
			<Quote
				subtitle={blok.subtitle}
				text={blok.text}
				author={blok.author}
				avatar={mapAsset(blok.avatar)}
				variant={blok.variant}
			/>
		</StoryBlokWrapper>
	)
}
