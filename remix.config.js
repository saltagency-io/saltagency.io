/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  cacheDirectory: './node_modules/.cache/remix',

  routes(defineRoutes) {
    return defineRoutes((route) => {
      route(
        'nl/vacatures',
        'routes/($lang)/careers.tsx',
        { id: 'careers-root-nl' },
        () => {
          route('', 'routes/($lang)/careers/index.tsx', {
            id: 'careers-nl',
            index: true,
          })
          route(':slug', 'routes/($lang)/careers/$slug.tsx', {
            id: 'vacancy-root-nl',
          })
          route(
            ':slug/solliciteren',
            'routes/($lang)/careers/$slug.apply.tsx',
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
