/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
	ignoredRouteFiles: ['**/.*'],
	cacheDirectory: './node_modules/.cache/remix',
	serverModuleFormat: 'esm',
	serverPlatform: 'node',
	tailwind: true,
	postcss: true,
	watchPaths: ['./tailwindconfig.ts'],

	routes: async defineRoutes => {
		return flatRoutes(
			'routes',
			defineRoutes(route => {
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
			}),
			{
				ignoredRouteFiles: [
					'.*',
					'**/*.css',
					'**/*.test.{js,jsx,ts,tsx}',
					'**/__*.*',
				],
			},
		)
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
