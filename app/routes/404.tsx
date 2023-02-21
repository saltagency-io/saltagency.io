import type { Handle } from '../../types'
import { HeroSection } from '~/components/sections/hero-section'

export const handle: Handle = {
  getSitemapEntries: () => null,
}

export function meta() {
  return { title: "Ain't nothing here" }
}

export default function NotFoundPage() {
  return (
    <main>
      <HeroSection
        title="404 - Oh no, you found a page that's missing stuff."
        body="This is not a page on saltagency.io. So sorry."
      />
    </main>
  )
}
