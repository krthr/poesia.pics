import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./resources/**/*.edge', './resources/**/*.{js,ts,jsx,tsx,vue}'],

  theme: {
    extend: {
      fontFamily: {
        serif: ['Libre Baskerville', ...defaultTheme.fontFamily.serif],
        sans: ['Instrument Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [require('daisyui')],

  daisyui: {
    themes: ['cupcake'],
  },
}
