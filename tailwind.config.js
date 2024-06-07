import daisyui from 'daisyui'
import plugin from 'tailwindcss/plugin'

module.exports = {
  plugins: [
    daisyui,

    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-iteration-count': (value) => {
            return {
              'animation-iteration-count': value,
            }
          },
        },
        {
          values: theme('transitionDelay'),
        },
      )
    }),
  ],

  daisyui: {
    themes: ['luxury'], //'synthwave', 'acid',
  },

  theme: {
    extend: {
      animation: {
        // Bounces 5 times 1s equals 5 seconds
        'bounce-short': 'bounce 1s ease-in-out 5',
      },
    },
  },
}
