module.exports = {
  apps: [
    {
      name: 'Server',
      script: 'tsx --inspect ./index.js',
      watch: ['./index.js', './server/**/*.ts', './.env'],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        FORCE_COLOR: '1',
      },
    },
    {
      name: 'Remix',
      script: 'remix watch',
      ignore_watch: ['.'],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        FORCE_COLOR: '1',
      },
    },
    // {
    //   name: 'Proxy',
    //   script:
    //     'local-ssl-proxy --source 3010 --target 3000 --cert localhost.pem --key localhost-key.pem',
    //   ignore_watch: ['.'],
    //   env: {
    //     NODE_ENV: process.env.NODE_ENV ?? 'development',
    //     FORCE_COLOR: '1',
    //   },
    // },
    {
      name: 'Postcss',
      script: 'postcss styles/**/*.css --base styles --dir app/styles',
      autorestart: false,
      watch: [
        './tailwind.config.js',
        './app/**/*.ts',
        './app/**/*.tsx',
        './styles/**/*.css',
      ],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        FORCE_COLOR: '1',
      },
    },
  ],
}
