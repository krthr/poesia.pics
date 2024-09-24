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
    themes: [
      {
        pastel: {
          ...require('daisyui/src/theming/themes')['pastel'],
          '--btn-text-case': 'none',
          '--rounded-btn': '0.5rem',
          '--rounded-box': '0.5rem',
          '--padding-card': '1rem',
        },
      },
    ],
  },
}
