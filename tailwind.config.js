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
    },
  },
}
