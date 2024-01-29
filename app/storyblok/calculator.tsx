import { Calculator } from '~/components/calculator'
import type { CalculatorBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbCalculator({ blok }: { blok: CalculatorBlok }) {
	return (
		<StoryBlokWrapper blok={blok} key={blok._uid}>
			<Calculator title={blok.title} subtitle={blok.subtitle} />
		</StoryBlokWrapper>
	)
}
