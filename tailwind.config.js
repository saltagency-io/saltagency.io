const path = require('path')
const defaultTheme = require('tailwindcss/defaultTheme')
const fromRoot = (p) => path.join(__dirname, p)

/** @type {import('tailwindcss').Config} */
module.exports = {
  // the NODE_ENV thing is for https://github.com/Acidic9/prettier-plugin-tailwind/issues/29
  mode: process.env.NODE_ENV ? 'jit' : undefined,
  content: [fromRoot('./app/**/*.+(js|jsx|ts|tsx|mdx|md)')],

  theme: {
    screens: {
      md: '640px',
      lg: '1024px',
      xl: '1500px',
    },
    colors: {
      // color scheme is defined in /app.css
      transparent: 'transparent',
      current: 'currentColor',
      white: 'var(--color-white)',
      black: 'var(--color-black)',

      gray: {
        100: 'var(--color-gray-100)',
        200: 'var(--color-gray-200)',
        300: 'var(--color-gray-300)',
        400: 'var(--color-gray-400)',
        500: 'var(--color-gray-500)',
        600: 'var(--color-gray-600)',
        700: 'var(--color-gray-700)',
        800: 'var(--color-gray-800)',
        900: 'var(--color-gray-900)',
      },
      pink: {
        500: 'var(--color-pink-500)',
      },
      red: {
        500: 'var(--color-red-500)',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Lexend', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateRows: {
        'max-content': 'max-content',
      },
      maxWidth: {
        '8xl': '96rem',
      },
      spacing: {
        '10vw': '10vw', // page margin
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
