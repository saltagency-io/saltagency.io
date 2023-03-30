import * as React from 'react'

import { Outlet } from '@remix-run/react'

import type { Handle } from '~/types'

export const handle: Handle = {
  getSitemapEntries: () => null,
}

export default function CareersRoot() {
  return <Outlet />
}
