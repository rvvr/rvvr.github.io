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
} from './graphData'

const step = 1
const period = 700

export default {
  data() {
    return {
      xLinesCount: 100,
      currentX: 0,
      points: [0, 0, 0, 0],
      layer: { x: 0, y: 0 },
      stage: { width: 0, height: 0 },
    }
  },
  computed: {
    xLinesLabels() {
      return [...Array(this.xLinesCount)].map((c, i) => {
        const y = (i * this.stage.height) / 5.75 + 1 - 5
        const x = this.stage.width - 70 + 5
        return {
          x,
          y,
          width: 200,
          text: this.xLinesCount * 100 - i * 100,
          fontSize: 12,
          fontFamily: 'Oswald',
          fill: '#fff',
          opacity: 0.2,
        }
      })
    },
    xLines() {
      return [...Array(this.xLinesCount)].map((c, i) => {
        const y = (i * this.stage.height) / 5.75 + 1
        const x = this.stage.width - 70
        return {
          lineCap: 'round',
          stroke: 'white',
          strokeWidth: 1,
          opacity: 0.2,
          points: [0, y, x, y],
        }
      })
    },
    line() {
      return { ...lineConf, points: this.points }
    },
    layerEndsX() {
      return this.currentX >= this.stage.width / 2
    },
    lastPointStart() {
      return this.points.slice(-4, 2)
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
        text: this.currentY,
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
    let from = -10
    let to = 10

    const interval = setInterval(() => {
      this.doStep()
      let y = this.getRandomY(from, to)

      // check top overflow
      const offsetTop = -y + 50
      if (offsetTop > this.layer.y) {
        for (let i = 0; i < this.points.length; i++) if (i % 2) this.points[i] += offsetTop
      }

      // check bottom overflow
      const offsetBottom = y + 50 - this.stage.height
      if (offsetBottom > this.layer.y) {
        for (let i = 0; i < this.points.length; i++) if (i % 2) this.points[i] -= offsetBottom
      }

      if (Date.now() - startTime > period) {
        this.addPoint(this.currentX, y)
        startTime = Date.now()
      } else if (!((Date.now() - startTime) % (period / 200))) {
        this.setLastPointEnd(this.currentX, y)
      } else {
        this.setLastPointEnd(this.currentX, this.currentY)
      }
    }, 50)
  },
  methods: {
    getRandomY(min, max) {
      return this.currentY + Math.floor(Math.random() * (max - min + 1) + min)
    },
    initStage() {
      this.stage.width = this.$refs.graph.clientWidth
      this.stage.height = this.$refs.graph.clientHeight
      const center = [0, this.stage.height / 2]
      this.points = [...center, ...center]
    },
    doStep() {
      if (this.layerEndsX) this.moveLayerX()
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

<style></style>
