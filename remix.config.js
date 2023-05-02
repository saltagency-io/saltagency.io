/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  cacheDirectory: './node_modules/.cache/remix',

  routes(defineRoutes) {
    return defineRoutes((route) => {
      route(
        'nl/vacatures',
        'routes/($locale)/careers.tsx',
        { id: 'careers-root-nl' },
        () => {
          route('', 'routes/($locale)/careers/index.tsx', {
            id: 'careers-nl',
            index: true,
          })
          route(':slug', 'routes/($locale)/careers/$slug.tsx', {
            id: 'vacancy-root-nl',
          })
          route(
            ':slug/solliciteren',
            'routes/($locale)/careers/$slug.apply.tsx',
            {
              id: 'vacancy-apply-nl',
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
