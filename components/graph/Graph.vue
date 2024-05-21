<template>
  <div class="flex-1" ref="graph">
    <client-only>
      <v-stage :config="stage">
        <v-layer :config="layer">
          <v-rect :config="bottomRect"></v-rect>
          <v-rect :config="topRect"></v-rect>
          <v-line v-for="(xLine, i) in xLines" :config="xLine" :key="i"></v-line>
          <v-text v-for="(xLineLabel, i) in xLinesLabels" :config="xLineLabel" :key="i"></v-text>
          <v-line :config="delimiter"></v-line>
          <v-line :config="line"></v-line>
          <v-circle :config="lineEnd"></v-circle>
          <v-text :config="topText"></v-text>
          <v-rect :config="livePriceRateTextRect"></v-rect>
          <v-text :config="livePriceRateText"></v-text>
          <v-rect :config="livePriceTextRect"></v-rect>
          <v-text :config="livePriceText"></v-text>
        </v-layer>
      </v-stage>
    </client-only>
  </div>
</template>

<script>
import {
  lineConf,
  lineEndConf,
  delimiterConf,
  topText,
  topRectConf,
  bottomRectConf,
  livePriceText,
  livePriceTextRect,
  livePriceRateText,
  livePriceRateTextRect,
  xLine,
  xLinesLabel,
} from './graphData'

const step = 2
const period = 500
const ratio = 5 // pixels for dollar
const xLinesCount = 50
const moneyBetween = 200000

export default {
  data() {
    return {
      rate: 700000000,
      currentX: 0,
      points: [0, 0, 0, 0],
      layer: { x: 0, y: 0 },
      stage: { width: 0, height: 0 },
      // lines
      xLines: [],
      xLinesLabels: [],
      xLinesOffset: 0,
    }
  },
  computed: {
    line() {
      return { ...lineConf, points: this.points }
    },
    lastPointEnd() {
      return this.points.slice(-2)
    },
    currentY() {
      return this.lastPointEnd[1]
    },

    // ui
    lineEnd() {
      return { x: this.currentX, y: this.currentY, ...lineEndConf }
    },
    delimiter() {
      return { points: [0, this.currentY, this.stage.width, this.currentY], ...delimiterConf }
    },
    topRect() {
      return {
        width: this.stage.width,
        height: this.currentY,
        fillLinearGradientEndPoint: { x: 50, y: this.stage.height },
        ...topRectConf,
      }
    },
    bottomRect() {
      return {
        width: this.stage.width,
        height: this.stage.height,
        fillLinearGradientEndPoint: { x: 50, y: this.stage.height },
        ...bottomRectConf,
      }
    },
    topText() {
      return { ...topText, x: this.stage.width / 2 - 100 }
    },
    livePriceX() {
      return this.stage.width - 120
    },
    livePriceY() {
      return this.currentY - 10
    },
    livePriceRateTextRect() {
      return {
        x: this.livePriceX,
        y: this.livePriceY - 5,
        ...livePriceRateTextRect,
      }
    },
    livePriceRateText() {
      return {
        ...livePriceRateText,
        x: this.livePriceX,
        y: this.livePriceY + 1,
        text: (this.rate / 10000).toFixed(4),
      }
    },
    livePriceTextRect() {
      return {
        x: this.livePriceX + 5,
        y: this.livePriceY - 20 - 5,
        ...livePriceTextRect,
      }
    },
    livePriceText() {
      return {
        x: this.livePriceX + 5,
        y: this.livePriceY - 20,
        ...livePriceText,
      }
    },
  },
  mounted() {
    this.initStage()
    let startTime = Date.now()

    const interval = setInterval(() => {
      let newRate = this.rate + 10000
      // let newRate = this.rate + this.randomize(-20000, 20000)
      const change = this.rate - newRate
      let y = this.currentY + (change / 10000) * ratio
      this.rate = newRate
      this.doStep()

      // if (Date.now() - startTime > period) {
      this.addPoint(this.currentX, y)
      startTime = Date.now()
      // }

      // animations
      // else if (!((Date.now() - startTime) % (period / 200))) {
      //   this.setLastPointEnd(this.currentX, y)
      // } else {
      //   this.setLastPointEnd(this.currentX, this.currentY)
      // }

      if (y < 50 || y > this.stage.height - 50) {
        for (let i = 0; i < this.points.length; i++) {
          if (i % 2) {
            this.points[i] -= (change / 10000) * ratio
          }
        }
      }
    }, 500)
  },
  methods: {
    randomize(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    initStage() {
      this.stage.width = this.$refs.graph.clientWidth
      this.stage.height = this.$refs.graph.clientHeight
      const center = [0, this.stage.height / 2]
      this.points = [...center, ...center]

      // lines
      const tempo = Math.floor(xLinesCount / 2)

      const pixelsBetween = (moneyBetween / 10000) * ratio
      const startY = center[1] - tempo * pixelsBetween
      const arrLines = [...Array(xLinesCount)].map((c, i) => ({
        y: startY + i * pixelsBetween,
      }))

      this.xLines = arrLines.map((c, i) => ({
        points: [0, c.y, this.stage.width, c.y],
        ...xLine,
      }))

      const startPrice = this.rate + tempo * moneyBetween
      this.xLinesLabels = arrLines.map((c, i) => {
        return {
          width: this.stage.width,
          text: ((startPrice - i * moneyBetween) / 10000).toFixed(4),
          ...xLinesLabel,
          ...c,
        }
      })
    },
    doStep() {
      const layerEndsX = this.currentX >= this.stage.width / 2
      if (layerEndsX) this.moveLayerX()
      else this.currentX += step
    },
    moveLayerX() {
      for (let i = 0; i < this.points.length; i++) if (!(i % 2)) this.points[i] -= step
    },
    setLastPointEnd(x, y) {
      this.points = this.points.slice(0, -2).concat([x, y])
    },
    addPoint(x, y) {
      this.points = this.points.concat([...this.lastPointEnd, x, y])
    },
  },
}
</script>
