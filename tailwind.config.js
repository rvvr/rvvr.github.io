import daisyui from 'daisyui'

module.exports = {
  plugins: [daisyui],

  daisyui: {
    themes: ['luxury'], //'synthwave', 'forest', 'business', 'luxury', 'coffee', 'dim', 'sunset', 'night', 'black'
  },

  theme: {
    extend: {
      colors: {
        'neutral-content': '#f4d56f',
        bright: '#ffe7a3',
      },
      animation: {
        // Bounces 5 times 1s equals 5 seconds
        'bounce-short': 'bounce 1s ease-in-out 5',
      },
    },
  },
}
