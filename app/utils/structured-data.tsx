import * as React from 'react'

import type { Breadcrumb, LdData } from '~/types'

function JsonLd({ data }: { data: LdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          {
            '@context': 'https://schema.org',
            ...data,
          },
          null,
          2,
        ),
      }}
    />
  )
}

export function SdBreadCrumbs({
  origin,
  breadcrumbs,
}: {
  origin: string
  breadcrumbs: Breadcrumb[]
}) {
  const data: LdData = {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: breadcrumb.name,
      item:
        i + 1 !== breadcrumbs.length
          ? `${origin}${breadcrumb.path}`
          : undefined,
    })),
  }

  return <JsonLd data={data} />
}

export function SdLogo({ origin }: { origin: string }) {
  const data: LdData = {
    '@type': 'Organization',
    url: origin,
    logo: 'https://a.storyblok.com/f/180005/107x45/038e65a2bd/logo-salt.svg',
  }

  return <JsonLd data={data} />
}
