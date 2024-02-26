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
  serverDependenciesToBundle: ['remix-i18next', 'accept-language-parser'],

  routes: async defineRoutes => {
    const routes = flatRoutes('routes', defineRoutes, {
      ignoredRouteFiles: [
        '.*',
        '**/*.css',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/__*.*',
      ],
    })
    const customRoutes = defineRoutes(route => {
      route(
        'en/careers',
        'routes/($lang)+/vacatures.tsx',
        { id: 'careers-root-en' },
        () => {
          route('', 'routes/($lang)+/vacatures._index.tsx', {
            id: 'careers-en',
            index: true,
          })
          route(':slug', 'routes/($lang)+/vacatures.$slug._index.tsx', {
            id: 'vacancy-root-en',
            index: true,
          })
          route(
            ':slug/apply',
            'routes/($lang)+/vacatures.$slug.solliciteren.tsx',
            {
              id: 'vacancy-apply-en',
            },
          )
        },
      )
    })
    return { ...routes, ...customRoutes }
  },
}
