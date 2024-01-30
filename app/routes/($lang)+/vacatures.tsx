import * as React from 'react'

import { Outlet } from '@remix-run/react'

import  { type Handle } from '#app/types.ts'

export const handle: Handle = {
	getSitemapEntries: () => null,
}

export default function VacanciesRoute() {
	return <Outlet />
}
