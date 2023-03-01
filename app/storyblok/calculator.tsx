import type { CalculatorBlok } from '~/types'
import { Calculator } from '~/components/calculator'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbCalculator({ blok }: { blok: CalculatorBlok }) {
  return (
    <StoryBlokWrapper blok={blok} key={blok._uid}>
      <Calculator />
    </StoryBlokWrapper>
  )
}
