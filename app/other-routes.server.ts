import  { type EntryContext } from '@remix-run/node'

import { defaultLanguage } from '#app/utils/i18n'
import { getSitemapXml } from '#app/utils/sitemap.server'

type Handler = (
	request: Request,
	remixContext: EntryContext,
) => Promise<Response | null> | null

export const pathedRoutes: Record<string, Handler> = {
	'/sitemap.xml': async (request, remixContext) => {
		const sitemap = await getSitemapXml(request, remixContext, defaultLanguage)
		return new Response(sitemap, {
			headers: {
				'Content-Type': 'application/xml',
				'Content-Length': String(Buffer.byteLength(sitemap)),
			},
		})
	},
	//TODO: Restore sitemap generation for other languages when i18n is implemented
	// '/nl/sitemap.xml': async (request, remixContext) => {
	//   const sitemap = await getSitemapXml(request, remixContext, 'nl')
	//   return new Response(sitemap, {
	//     headers: {
	//       'Content-Type': 'application/xml',
	//       'Content-Length': String(Buffer.byteLength(sitemap)),
	//     },
	//   })
	// },
}

export const routes: Handler[] = [
	...Object.entries(pathedRoutes).map(([path, handler]) => {
		return (request: Request, remixContext: EntryContext) => {
			if (new URL(request.url).pathname !== path) return null
			return handler(request, remixContext)
		}
	}),
]
