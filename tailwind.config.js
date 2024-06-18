import daisyui from 'daisyui'

module.exports = {
  plugins: [daisyui],

  daisyui: {
    themes: ['luxury'], //'synthwave', 'acid',
  },

  theme: {
    extend: {
      colors: {
        'neutral-content': '#f4d56f',
      },
      animation: {
        // Bounces 5 times 1s equals 5 seconds
        'bounce-short': 'bounce 1s ease-in-out 5',
      },
    },
  },
}
