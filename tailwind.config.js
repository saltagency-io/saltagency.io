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
      white: 'hsl(var(--color-white) / <alpha-value>)',
      black: 'hsl(var(--color-black) / <alpha-value>)',

      gray: {
        100: 'hsl(var(--color-gray-100))',
        200: 'hsl(var(--color-gray-200))',
        300: 'hsl(var(--color-gray-300))',
        400: 'hsl(var(--color-gray-400))',
        500: 'hsl(var(--color-gray-500))',
        600: 'hsl(var(--color-gray-600))',
        700: 'hsl(var(--color-gray-700))',
        800: 'hsl(var(--color-gray-800))',
        900: 'hsl(var(--color-gray-900))',
      },
      blue: {
        200: 'hsl(var(--color-blue-200) / <alpha-value>)',
        300: 'hsl(var(--color-blue-300) / <alpha-value>)',
        400: 'hsl(var(--color-blue-400) / <alpha-value>)',
        500: 'hsl(var(--color-blue-500) / <alpha-value>)',
        600: 'hsl(var(--color-blue-600) / <alpha-value>)',
        700: 'hsl(var(--color-blue-700) / <alpha-value>)',
        800: 'hsl(var(--color-blue-800) / <alpha-value>)',
      },
      pink: {
        200: 'hsl(var(--color-pink-200) / <alpha-value>)',
        300: 'hsl(var(--color-pink-300) / <alpha-value>)',
        400: 'hsl(var(--color-pink-400) / <alpha-value>)',
        500: 'hsl(var(--color-pink-500) / <alpha-value>)',
        600: 'hsl(var(--color-pink-600) / <alpha-value>)',
        700: 'hsl(var(--color-pink-700) / <alpha-value>)',
        800: 'hsl(var(--color-pink-800) / <alpha-value>)',
      },
      red: {
        500: 'hsl(var(--color-red-500) / <alpha-value>)',
      },
      yellow: {
        500: 'hsl(var(--color-yellow-500) / <alpha-value>)',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans],
        display: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '3xl': '1.9375rem', // 31px
        '4xl': '2.5625rem', // 41px
        '5xl': '3.375rem', // 54px
        '6xl': '4.375rem', // 70px
      },
      lineHeight: {
        normal: '120%',
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
        18: '4.5rem', //72px
      },
      blur: {
        '4xl': '100px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
