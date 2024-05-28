<template>
  <v-rect :config="livePriceRateTextRect"></v-rect>
  <v-text :config="livePriceRateText"></v-text>
  <v-rect :config="livePriceTextRect"></v-rect>
  <v-text :config="livePriceText"></v-text>
</template>

<script>
export default {
  data() {
    return {
      y: 0,
    }
  },
  props: ['stage', 'currentY', 'rate', 'price'],
  watch: {
    currentY(val, old) {
      if (Math.abs(this.y - val) > 75) {
        this.y = val
      }
    },
  },
  computed: {
    livePriceX() {
      return this.stage.width - 120
    },
    livePriceY() {
      return this.y - 10
    },
    livePriceRateTextRect() {
      return {
        cornerRadius: 7,
        fill: '#151513',
        height: 30,
        shadowBlur: 10,
        shadowColor: '#151513',
        shadowOffsetX: -2,
        shadowOffsetY: -2,
        shadowOpacity: 0.5,
        stroke: '#f4d56f',
        strokeWidth: 1,
        width: 110,
        x: this.livePriceX,
        y: this.livePriceY - 5,
        zIndex: 1,
      }
    },
    livePriceRateText() {
      return {
        align: 'left',
        fill: '#f4d56f',
        fontFamily: 'Oswald',
        fontSize: 21,
        text: '70,982.1337',
        text: this.price,
        width: 110,
        x: this.livePriceX + 7,
        y: this.livePriceY + 1,
      }
    },
    livePriceTextRect() {
      return {
        cornerRadius: 7,
        fill: '#f4d56f',
        height: 20,
        shadowBlur: 10,
        shadowColor: '#151513',
        shadowOffsetX: -2,
        shadowOffsetY: -2,
        shadowOpacity: 0.2,
        strokeWidth: 5,
        width: 100,
        x: this.livePriceX + 5,
        y: this.livePriceY - 20 - 5,
      }
    },
    livePriceText() {
      return {
        align: 'center',
        fill: '#151513',
        fontFamily: 'Oswald',
        fontSize: 12,
        fontStyle: 'bold',
        text: 'LIVE BITCOIN',
        width: 100,
        x: this.livePriceX + 5,
        y: this.livePriceY - 20,
      }
    },
  },
}
</script>

<style></style>
