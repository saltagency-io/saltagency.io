import * as React from 'react'

import type { AppData, LinkDescriptor } from '@remix-run/node'
import { useLocation, useMatches } from '@remix-run/react'
import type { RouteData } from '@remix-run/react/dist/routeData'

import type { Params, Location } from 'react-router-dom'

type HandleConventionArguments<Data extends AppData = AppData> = {
  id: string
  data: Data
  params: Params
  location: Location
  parentsData: RouteData
}

export interface DynamicLinksFunction<Data extends AppData = AppData> {
  (args: HandleConventionArguments<Data>): LinkDescriptor[]
}

export function DynamicLinks() {
  const location = useLocation()

  const links: LinkDescriptor[] = useMatches().flatMap(
    (match, index, matches) => {
      const fn = match.handle?.dynamicLinks as DynamicLinksFunction | undefined
      if (typeof fn !== 'function') return []
      let result = fn({
        id: match.id,
        data: match.data,
        params: match.params,
        location,
        parentsData: matches.slice(0, index).map((match) => match.data),
      })
      return Array.isArray(result) ? result : []
    },
  )

  return (
    <>
      {links.map((link) => (
        <link {...link} key={link.integrity || JSON.stringify(link)} />
      ))}
    </>
  )
}
