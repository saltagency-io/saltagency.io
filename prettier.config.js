process.env.RUNNING_PRETTIER = 'true'
module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 80,
  proseWrap: 'always',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  importOrder: [
    // Place react import at the top
    '^react$',
    // remix deps
    '^(@remix-run)(/.*|$)',
    // Storyblok deps
    '^(@storyblok)(/.*|$)',
    // External dependencies
    '^\\w',
    '^@',
    // Every import starting with ./ or ~/
    '^[./|~/]',
  ],
  importOrderSeparation: true,
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
}
