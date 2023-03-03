import * as React from 'react'

function JsonLd(thing: any) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          {
            '@context': 'https://schema.org',
            ...thing
          },
          null,
          2,
        ),
      }}
    />
  )
}

export function SdBreadCrumbs({breadcrumbs}: {breadcrumbs: any}) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Books",
          "item": "https://example.com/books"
        },{
          "@type": "ListItem",
          "position": 2,
          "name": "Science Fiction",
          "item": "https://example.com/books/sciencefiction"
        },{
          "@type": "ListItem",
          "position": 3,
          "name": "Award Winners"
        }]
      }
    `,
      }}
    />
  )
}
