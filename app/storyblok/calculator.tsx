import { Calculator } from '#app/components/calculator.tsx'
import  { type CalculatorBlok } from '#app/types.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbCalculator({ blok }: { blok: CalculatorBlok }) {
	return (
		<StoryBlokWrapper blok={blok} key={blok._uid}>
			<Calculator title={blok.title} subtitle={blok.subtitle} />
		</StoryBlokWrapper>
	)
}
