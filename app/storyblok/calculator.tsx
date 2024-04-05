import { lazy, Suspense } from 'react'

import { type CalculatorBlok } from '#app/types.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

const Calculator = lazy(() =>
  import('#app/components/calculator.tsx').then(({ Calculator }) => ({
    default: Calculator,
  })),
)

export function SbCalculator({ blok }: { blok: CalculatorBlok }) {
  return (
    <StoryBlokWrapper blok={blok} key={blok._uid}>
      <Suspense fallback={null}>
        <Calculator title={blok.title} subtitle={blok.subtitle} />
      </Suspense>
    </StoryBlokWrapper>
  )
}
