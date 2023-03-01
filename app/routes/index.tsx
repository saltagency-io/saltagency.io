import * as React from 'react'

import { ServerError } from '~/components/errors'

export { default, loader } from './$slug'

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
  return <ServerError />
}
