import * as React from 'react'

import { Breadcrumbs } from '#app/components/breadcrumbs.tsx'
import { ButtonLink } from '#app/components/button.tsx'
import { Grid } from '#app/components/grid.tsx'
import { H3, H5 } from '#app/components/typography.tsx'
import { routes } from '#app/routes/($lang)+/vacatures.$slug.solliciteren.tsx'
import { useI18n } from '#app/utils/i18n-provider.tsx'
import { useLabels } from '#app/utils/labels-provider.tsx'

type Props = {
	children: React.ReactNode
	title: string
	summary: string
}

export function Vacancy({ children, title, summary }: Props) {
	const { language } = useI18n()
	const { t } = useLabels()

	return (
		<>
			<Grid as="header" className="pt-8 lg:pt-14">
				<div className="col-span-full mb-4 lg:mb-16">
					<Breadcrumbs />
				</div>
				<div className="col-span-full lg:col-span-10">
					<H5 as="h1" variant="secondary" className="mb-2">
						{title}
					</H5>
					<H3 as="h2" className="mb-12">
						{summary}
					</H3>
					<ButtonLink
						to={`${routes[language]}?role=${encodeURIComponent(title)}`}
					>
						{t('cta.apply')}
					</ButtonLink>
				</div>
			</Grid>
			{children}
		</>
	)
}
