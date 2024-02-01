import { flatRoutes } from 'remix-flat-routes'

/** @type {import('@remix-run/dev').AppConfig} */
export default {
	cacheDirectory: './node_modules/.cache/remix',
	ignoredRouteFiles: ['**/.*'],
	serverModuleFormat: 'esm',
	serverPlatform: 'node',
	tailwind: true,
	postcss: true,
	watchPaths: ['./tailwind.config.ts'],

	routes: async defineRoutes => {
		return flatRoutes('routes', defineRoutes, {
			ignoredRouteFiles: [
				'.*',
				'**/*.css',
				'**/*.test.{js,jsx,ts,tsx}',
				'**/__*.*',
			],
			// defineRoutes: route => {
			// 	route(
			// 		'en/careers',
			// 		'routes/($lang)/vacatures.tsx',
			// 		{ id: 'careers-root-en' },
			// 		() => {
			// 			route('', 'routes/($lang)/vacatures._index.tsx', {
			// 				id: 'careers-en',
			// 				index: true,
			// 			})
			// 			route(':slug', 'routes/($lang)/vacatures.$slug.tsx', {
			// 				id: 'vacancy-root-en',
			// 			})
			// 			route(
			// 				':slug/apply',
			// 				'routes/($lang)/vacatures.$slug.solliciteren.tsx',
			// 				{
			// 					id: 'vacancy-apply-en',
			// 				},
			// 			)
			// 		},
			// 	)
			// },
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
