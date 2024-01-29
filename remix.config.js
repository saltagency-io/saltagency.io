/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
	ignoredRouteFiles: ['**/.*'],
	cacheDirectory: './node_modules/.cache/remix',

	routes(defineRoutes) {
		return defineRoutes(route => {
			route(
				'en/careers',
				'routes/($lang)/vacatures.tsx',
				{ id: 'careers-root-en' },
				() => {
					route('', 'routes/($lang)/vacatures/index.tsx', {
						id: 'careers-en',
						index: true,
					})
					route(':slug', 'routes/($lang)/vacatures/$slug.tsx', {
						id: 'vacancy-root-en',
					})
					route(
						':slug/apply',
						'routes/($lang)/vacatures/$slug.solliciteren.tsx',
						{
							id: 'vacancy-apply-en',
						},
					)
				},
			)
		})
	},

	serverDependenciesToBundle: [
		/^rehype.*/,
		/^remark.*/,
		/^unified.*/,
		/^unist.*/,
		/^hast.*/,
		/^bail.*/,
		/^trough.*/,
		/^mdast.*/,
		/^micromark.*/,
		/^decode.*/,
		/^character.*/,
		/^property.*/,
		/^space.*/,
		/^trim-lines$/,
		/^comma.*/,
		/^react-markdown$/,
		/^vfile.*/,
	],
}
