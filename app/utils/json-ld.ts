import {
  type BreadcrumbList,
  type JobPosting,
  type Organization,
  type Place,
} from 'schema-dts'

import { type Breadcrumb } from '#app/types.ts'
import { LOGO_URL } from '#app/utils/misc.tsx'

const address: Place = {
  '@type': 'Place',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Johan Huizingalaan 763A',
    addressLocality: ', Amsterdam',
    addressRegion: 'Noord-Holland',
    postalCode: '1066 VH',
    addressCountry: 'NL',
  },
}

export function getJsonLdLogo(origin: string) {
  const data: Organization = {
    '@type': 'Organization',
    url: origin,
    logo: LOGO_URL,
    location: address,
  }
  return {
    '@context': 'https://schema.org',
    ...data,
  }
}

export function getJsonLdBreadcrumbs({
  origin,
  breadcrumbs,
}: {
  origin: string
  breadcrumbs: Breadcrumb[]
}) {
  const data: BreadcrumbList = {
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
  return {
    '@context': 'https://schema.org',
    ...data,
  }
}

export function getJsonLdJobPosting({
  title,
  description,
  origin,
  datePosted,
}: {
  title: string
  description: string
  origin: string
  datePosted: string
}) {
  const data: JobPosting = {
    '@type': 'JobPosting',
    title: title,
    description: `<p>${description}</p>`,
    datePosted: datePosted,
    employmentType: ['FULL_TIME', 'PART_TIME'],
    jobLocationType: 'TELECOMMUTE',
    jobLocation: address,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Koodin',
      sameAs: origin,
      logo: LOGO_URL,
    },
  }
  return {
    '@context': 'https://schema.org',
    ...data,
  }
}
