import { Quote } from '~/components/quote'
import type { QuoteBlok } from '~/types'
import { mapAsset } from '~/utils/mappers'
import { StoryBlokWrapper } from '~/utils/storyblok'

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
