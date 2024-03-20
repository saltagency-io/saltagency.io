import { vitePlugin as remix } from '@remix-run/dev'
import { flatRoutes } from 'remix-flat-routes'
import { defineConfig } from 'vite'

const MODE = process.env.NODE_ENV

export default defineConfig({
  build: {
    cssMinify: MODE === 'production',
    rollupOptions: {
      external: [/node:.*/, 'stream', 'crypto', 'fsevents'],
    },
  },
  ssr: {
    noExternal: ['remix-i18next'],
  },
  plugins: [
    remix({
      ignoredRouteFiles: ['**/*.css'],
      serverModuleFormat: 'esm',
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
    }),
  ],
})
