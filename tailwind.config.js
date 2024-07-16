import daisyui from 'daisyui'
import { themes } from './themes'

module.exports = {
  plugins: [daisyui],
  daisyui: { themes },
  theme: {
    extend: {
      colors: {
        'neutral-content': '#f4d56f',
        bright: '#ffe7a3',
      },
      animation: {
        'bounce-short': 'bounce 1s ease-in-out 5',
      },
    },
  },
}
