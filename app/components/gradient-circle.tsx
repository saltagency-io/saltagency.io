import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'

type Props = {
	height?: number
	width?: number
	top?: number
	right?: number
	bottom?: number
	left?: number
	rotate?: number
	opacity?: number
	z?: number
	className?: string
}

export function GradientCircle({
	height = 900,
	width = 900,
	top = 0,
	right = 0,
	bottom = 0,
	left = 0,
	rotate = 0,
	opacity = 40,
	z = -10,
	className,
}: Props) {
	const shouldReduceMotion = useReducedMotion()

	return (
		<motion.div
			className={clsx(
				'bg-gradient-radial pointer-events-none absolute rounded-full blur-4xl',
				className,
			)}
			style={{
				transform: `rotate(${rotate}deg)`,
				opacity: opacity / 100,
				height: `${height}px`,
				width: `${width}px`,
				top: top !== 0 ? `${top}px` : undefined,
				right: right !== 0 ? `${right}px` : undefined,
				bottom: bottom !== 0 ? `${bottom}px` : undefined,
				left: left !== 0 ? `${left}px` : undefined,
				zIndex: z,
			}}
			initial={{ scale: shouldReduceMotion ? 1 : 0.5 }}
			animate={{ scale: 1.01, rotate }} // If we scale to 1 safari dies
			transition={{ duration: 0.5 }}
		/>
	)
}
