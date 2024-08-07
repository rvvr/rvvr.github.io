<template>
  <!-- <v-rect :config="livePriceRateTextRect"></v-rect> -->
  <v-text :config="livePriceRateText"></v-text>
</template>

<script>
import { lime, red } from 'tailwindcss/colors'

export default {
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
    // livePriceRateTextRect() {
    //   return {
    //     fill: '#09090b',
    //     height: 16,
    //     width: 60,
    //     offsetX: 62 + 2,
    //     x: this.stage.width,
    //     y: this.livePriceY + 2,
    //   }
    // },
    livePriceRateText() {
      return {
        align: 'left',
        fill: this.fillColor,
        fontFamily: 'Oswald',
        fontSize: 12,
        text: this.price,
        x: this.stage.width,
        y: this.livePriceY + 5,
        width: 62,
        offsetX: 62,
        shadowColor: '#09090b',
        shadowBlur: 10,
      }
    },
  },
}
</script>
