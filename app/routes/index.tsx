import * as React from 'react'

import { useCatch } from '@remix-run/react'

import { NotFoundError, ServerError } from '~/components/errors'

export { default, loader } from './$slug'

// export function ErrorBoundary({ error }: { error: Error }) {
//   console.error(error)
//   return <ServerError />
// }
