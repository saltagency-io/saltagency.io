import * as React from 'react'

import type { Breadcrumb } from '~/types'
import { LOGO_URL } from '~/utils/misc'
import type {
	BreadcrumbList,
	JobPosting,
	Organization,
	Place,
} from 'schema-dts'

const address: Place = {
	'@type': 'Place',
	address: {
		'@type': 'PostalAddress',
		streetAddress: 'Evert van de Beekstraat 354',
		addressLocality: ', Amsterdam',
		addressRegion: 'Noord-Holland',
		postalCode: '1118 CZ',
		addressCountry: 'NL',
	},
}

function JsonLd({ data }: { data: any }) {
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

	return <JsonLd data={data} />
}

export function SdLogo({ origin }: { origin: string }) {
	const data: Organization = {
		'@type': 'Organization',
		url: origin,
		logo: LOGO_URL,
		location: address,
	}

	return <JsonLd data={data} />
}

export function SdJobPosting({
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
			name: 'Salty Agency',
			sameAs: origin,
			logo: LOGO_URL,
		},
	}

	return <JsonLd data={data} />
}
