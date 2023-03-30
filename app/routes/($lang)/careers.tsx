import * as React from 'react'

import { Outlet, useCatch } from '@remix-run/react'

import { NotFoundError } from '~/components/errors'
import type { Handle } from '~/types'

export const handle: Handle = {
  getSitemapEntries: () => null,
}

export default function CareersRoot() {
  return <Outlet />
}

export function CatchBoundary() {
  const caught = useCatch()
  console.error('CatchBoundary', caught)
  return <NotFoundError />
}
