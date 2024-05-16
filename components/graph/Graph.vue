<template>
  <div class="flex-1" ref="graph">
    <client-only>
      <v-stage :config="stage">
        <v-layer :config="layer">
          <v-rect :config="bottomRect"></v-rect>
          <v-rect :config="topRect"></v-rect>
          <v-line :config="line"></v-line>
          <v-line :config="delimiter"></v-line>
          <v-circle :config="lineEnd"></v-circle>
          <v-text :config="topText"></v-text>
        </v-layer>
      </v-stage>
    </client-only>
  </div>
</template>

<script>
import { lineConf, lineEndConf, delimiterConf, topText, topRectConf, bottomRectConf } from './graph'

const step = 1
const period = 500

export default {
  data() {
    return {
      currentX: 0,
      points: [0, 0, 0, 0],
      layer: { x: 0, y: 0 },
      stage: { width: 0, height: 0 },
    }
  },
  computed: {
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
    }, 10)
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
