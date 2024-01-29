export function SvgGradientReference() {
	return (
		<>
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				style={{
					position: 'absolute',
					width: 0,
					height: 0,
					overflow: 'hidden',
					pointerEvents: 'none',
				}}
				aria-hidden="true"
			>
				<defs>
					<linearGradient
						id="gradient-brand"
						x1="20"
						y1="2"
						x2="20"
						y2="38"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#8954FF" />
						<stop offset="1" stopColor="#546DFF" />
					</linearGradient>

					<linearGradient
						id="gradient-hero-line-1"
						x1="-1830.1"
						y1="705.113"
						x2="1294.79"
						y2="581.097"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#A26EF7" />
						<stop offset="1" stopColor="#6E79F7" />
					</linearGradient>

					<linearGradient
						id="gradient-hero-line-2"
						x1="-2376.24"
						y1="29.5161"
						x2="1422.11"
						y2="194.804"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#A26EF7" />
						<stop offset="1" stopColor="#6E79F7" />
					</linearGradient>
				</defs>
			</svg>
		</>
	)
}
