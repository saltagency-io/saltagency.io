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
      blue: {
        200: 'var(--color-blue-200)',
        300: 'var(--color-blue-300)',
        400: 'var(--color-blue-400)',
        500: 'var(--color-blue-500)',
        600: 'var(--color-blue-600)',
        700: 'var(--color-blue-700)',
        800: 'var(--color-blue-800)',
      },
      pink: {
        200: 'var(--color-pink-200)',
        300: 'var(--color-pink-300)',
        400: 'var(--color-pink-400)',
        500: 'var(--color-pink-500)',
        600: 'var(--color-pink-600)',
        700: 'var(--color-pink-700)',
        800: 'var(--color-pink-800)',
      },
      red: {
        500: 'var(--color-red-500)',
      },
      purple: {
        500: 'var(--color-purple-500)',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Satoshi', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '3xl': '1.9375rem', // 31px
        '4xl': '2.5625rem', // 41px
        '5xl': '3.375rem', // 54px
        '6xl': '4.375rem', // 70px
      },
      letterSpacing: {
        tight: '-0.02em',
      },
      textOpacity: {
        60: '0.6',
      },
      gridTemplateRows: {
        'max-content': 'max-content',
      },
      maxWidth: {
        '5xl': '65rem', // 1040px
      },
      spacing: {
        '8vw': '8vw', // page margin
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
