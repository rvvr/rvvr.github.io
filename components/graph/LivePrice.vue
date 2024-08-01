<template>
  <v-rect :config="livePriceRateTextRect"></v-rect>
  <v-text :config="livePriceRateText"></v-text>
</template>

<script>
import { lime, red } from 'tailwindcss/colors'

export default {
  data() {
    return {
      livePriceX: this.stage.width - 85,
    }
  },
  props: ['rate', 'price', 'stage', 'currentY', 'sideHightLighted'],

  computed: {
    fillColor() {
      if (this.sideHightLighted) {
        return this.sideHightLighted === 'up' ? lime['500'] : red['500']
      } else {
        return '#f4d56f'
      }
    },
    livePriceY() {
      return this.currentY - 10
    },
    livePriceRateTextRect() {
      return {
        cornerRadius: 7,
        fill: '#09090b',
        height: 20,
        width: 61,
        x: this.livePriceX + 2 + 15,
        y: this.livePriceY,
      }
    },
    livePriceRateText() {
      return {
        align: 'left',
        fill: this.fillColor,
        fontFamily: 'Oswald',
        fontSize: 12,
        text: this.price,
        width: 110,
        x: this.livePriceX + 5 + 15,
        y: this.livePriceY + 5,
      }
    },
  },
}
</script>
