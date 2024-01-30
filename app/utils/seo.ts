import { LOGO_URL } from '#app/utils/misc.tsx'

export function getSocialMetas({
	url,
	title = 'Koodin',
	description = 'Wij zijn Koodin, je nieuwe digitale partner',
	image = LOGO_URL,
	keywords,
}: {
	image?: string
	url: string
	title?: string
	description?: string
	keywords?: string
}) {
	return [
		{ title },
		{ name: 'description', content: description },
		{ name: keywords, content: keywords },
		{ name: 'image', content: image },
		{ name: 'og:url', content: url },
		{ name: 'og:title', content: title },
		{ name: 'og:description', content: description },
		{ name: 'og:image', content: image },
		{
			name: 'twitter:card',
			content: image ? 'summary_large_image' : 'summary',
		},
		{ name: 'twitter:creator', content: '@koodin' },
		{ name: 'twitter:site', content: '@koodin' },
		{ name: 'twitter:title', content: title },
		{ name: 'twitter:description', content: description },
		{ name: 'twitter:image', content: image },
		{ name: 'twitter:alt', content: title },
	]
}
