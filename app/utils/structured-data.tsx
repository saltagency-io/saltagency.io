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

// {
//   "@context": "https://schema.org",
//   "@type": "BreadcrumbList",
//   "itemListElement": [{
//   "@type": "ListItem",
//   "position": 1,
//   "name": "Books",
//   "item": "https://example.com/books"
// },{
//   "@type": "ListItem",
//   "position": 2,
//   "name": "Science Fiction",
//   "item": "https://example.com/books/sciencefiction"
// },{
//   "@type": "ListItem",
//   "position": 3,
//   "name": "Award Winners"
// }]
// }
