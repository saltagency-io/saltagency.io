type TransformerOptions = {
	width?: number
	height?: number
	quality?: number
	crop?: 'default' | 'smart'
	blur?: number
	grayscale?: boolean
}

// Produces something like: https://a.storyblok.com/f/180005/1280x1921/3c091c155d/timo.png/m/242x316/smart/filters:quality(75):blur(1)

function buildImgUrl(
	url: string,
	{ width = 0, height = 0, quality = 75, grayscale, blur }: TransformerOptions,
) {
	const dimensions = `${width}x${height}`

	let filters = `filters:quality(${quality})`
	filters += grayscale ? `:grayscale()` : ''
	filters += blur ? `:blur(${blur})` : ''

	return `${url}/m/${dimensions}/smart/${filters}`
}

type ImageOptions = {
	widths: number[]
	sizes: string[]
	transformations?: TransformerOptions
}

export function getImgProps(
	url: string,
	alt: string,
	{ widths, sizes, transformations }: ImageOptions,
) {
	const averageSize = Math.ceil(widths.reduce((a, s) => a + s) / widths.length)

	return {
		alt: alt,
		src: buildImgUrl(url, {
			width: averageSize,
			...transformations,
		}),
		srcSet: widths
			.map(width =>
				[
					`${buildImgUrl(url, {
						width: width,
						...transformations,
					})} ${width}w`,
				].join(' '),
			)
			.join(', '),
		sizes: sizes.join(', '),
	} as const
}
