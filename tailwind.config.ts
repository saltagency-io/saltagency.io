const path = require('path')
const defaultTheme = require('tailwindcss/defaultTheme')
const fromRoot = (p: string) => path.join(__dirname, p)

export default {
  // the NODE_ENV thing is for https://github.com/Acidic9/prettier-plugin-tailwind/issues/29
  mode: process.env.NODE_ENV ? 'jit' : undefined,
  content: [fromRoot('./app/**/*.+(js|jsx|ts|tsx|mdx|md)')],

  theme: {
    screens: {
      sm: '370px',
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
      gray: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'body'].reduce(
        (acc, cv) => ({
          ...acc,
          [cv]: `hsl(var(--color-gray-${cv}) / <alpha-value>)`,
        }),
        {},
      ),
      blue: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].reduce(
        (acc, cv) => ({
          ...acc,
          [cv]: `hsl(var(--color-blue-${cv}) / <alpha-value>)`,
        }),
        {},
      ),
      purple: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].reduce(
        (acc, cv) => ({
          ...acc,
          [cv]: `hsl(var(--color-purple-${cv}) / <alpha-value>)`,
        }),
        {},
      ),
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
        '3xl': '2rem', // 32px
        '4xl': '2.5rem', // 4px
        '5xl': '3rem', // 48px
        '6xl': '3.5rem', // 56px
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
      borderRadius: {
        '4xl': '2rem',
      },
      gridTemplateRows: {
        'max-content': 'max-content',
      },
      maxWidth: {
        '5xl': '65rem', // 1040px
      },
      spacing: {
        '8vw': '8vw', // page margin
        '100vw': '100vw',
        '200vw': '200vw',
        '100vh': '100vh',
        18: '4.5rem', //72px
        30: '7.5rem', // 120px
      },
      blur: {
        '4xl': '100px',
      },
      dropShadow: {},
      opacity: {
        1: '0.01',
      },
      boxShadow: {
        card: '0px 23px 38px 0px rgba(28, 32, 54, 0.10), 0px 1px 0px 0px rgba(255, 255, 255, 0.35) inset',
        'card-container': '0px 16px 64px hsl(var(--color-purple-700) / 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
