<template>
  <div class="flex-1" ref="graph">
    <client-only>
      <v-stage :config="stage">
        <v-layer :config="layer">
          <v-rect :config="bottomRect"></v-rect>
          <v-rect :config="topRect"></v-rect>
          <v-line v-for="i in xLinesCount" :config="xLines[i]" key="i"></v-line>
          <v-text v-for="i in xLinesCount" :config="xLinesLabels[i]" key="i"></v-text>
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

const step = 1
const period = 500

export default {
  data() {
    return {
      rate: 70000,
      currentX: 0,
      points: [0, 0, 0, 0],
      layer: { x: 0, y: 0 },
      stage: { width: 0, height: 0 },
      // lines
      xLinesCount: 100,
      xLines: [],
      xLinesLabels: [],
      xLinesOffset: 0,
    }
  },
  computed: {
    // xLinesLabels() {
    //   const start = this.rate - this.xLinesCount * 10
    //   return [...Array(this.xLinesCount)].map((c, i) => {
    //     return {
    //       width: this.stage.width,
    //       // price per pixel
    //       y: (i * this.stage.height) / 8 + 4,

    //       text: start + i * 10,

    //       ...xLinesLabels,
    //     }
    //   })
    // },

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
        text: this.rate.toFixed(4),
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
      let newRate = this.rate + this.randomize(0, 0)
      const change = this.rate - newRate
      let y = this.currentY + change
      this.rate = newRate
      this.doStep()

      if (Date.now() - startTime > period) {
        this.addPoint(this.currentX, y)
        startTime = Date.now()
      }
      // funny animations
      // else if (!((Date.now() - startTime) % (period / 200))) {
      //   this.setLastPointEnd(this.currentX, y)
      // } else {
      //   this.setLastPointEnd(this.currentX, this.currentY)
      // }

      if (y < 100 || y > this.stage.height - 100) {
        for (let i = 0; i < this.points.length; i++) {
          if (i % 2) {
            this.points[i] -= change
          }
        }
      }
    }, 50)
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
      const startPrice = this.rate - (this.xLinesCount / 2) * 10
      const startY = center[1] - (this.xLinesCount / 2) * 10
      this.xLines = [...Array(this.xLinesCount)].map((c, i) => {
        let y = startY + i * 10
        return {
          points: [0, y, this.stage.width, y],
          ...xLine,
        }
      })
      this.xLinesLabels = [...Array(this.xLinesCount)].map((c, i) => {
        return {
          width: this.stage.width,
          y: startY + i * 10,
          text: startPrice + i * 10,
          ...xLinesLabel,
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
