import * as React from 'react'

import clsx from 'clsx'

interface GridProps {
	children: React.ReactNode
	overflow?: boolean
	className?: string
	as?: React.ElementType
	nested?: boolean
	rowGap?: boolean
}

export const Grid = React.forwardRef<HTMLElement, GridProps>(function Grid(
	{ children, className, as: Tag = 'div', nested, rowGap },
	ref,
) {
	return (
		<Tag
			ref={ref}
			className={clsx('relative', {
				'mx-4 md:mx-8vw': !nested,
				'w-full': nested,
			})}
		>
			<div
				className={clsx(
					'relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6',
					{
						'mx-auto max-w-5xl': !nested,
						'gap-y-4 lg:gap-y-6': rowGap,
					},
					className,
				)}
			>
				{children}
			</div>
		</Tag>
	)
})

/**
 * Use for development only! It renders the grid columns and gaps as page overlay
 */
export function GridLines() {
	if (ENV.NODE_ENV !== 'development') {
		throw new Error('<GridLines />  should only be used during development')
	}

	return (
		<div className="pointer-events-none fixed inset-0 z-10 select-none">
			<Grid>
				{Array.from({ length: 12 }).map((_, idx) => (
					<div
						key={idx}
						className="flex h-screen items-start bg-red-500 text-black opacity-10"
					>
						<div className="w-full pt-4 text-center text-lg text-black">
							{idx + 1}
						</div>
					</div>
				))}
			</Grid>
		</div>
	)
}
