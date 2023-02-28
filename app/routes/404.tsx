// this is just here to test the 404 page
import * as React from 'react'

import { ErrorSection } from '~/components/errors'
import type { Handle } from '~/types'

export const handle: Handle = {
  getSitemapEntries: () => null,
}

export function meta() {
  return { title: "Ain't nothing here" }
}

export default function NotFoundPage() {
  return (
    <main>
      <ErrorSection title="404 - We searched everywhere but we couldn't find it" />
    </main>
  )
}
