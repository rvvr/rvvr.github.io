<template>
  <div class="bg-base-300" ref="graph">
    <client-only>
      <v-stage :config="stage">
        <v-layer :config="layer">
          <v-line :config="line"></v-line>
        </v-layer>
      </v-stage>
    </client-only>
  </div>
</template>

<script>
const step = 1
const period = 500
const lineConf = {
  stroke: 'red',
  strokeWidth: 4,
  lineCap: 'round',
  lineJoin: 'round',
  shadowColor: 'white',
  shadowBlur: 10,
  shadowOffset: { x: -10, y: 0 },
  shadowOpacity: 0.5,
}
export default {
  data() {
    return {
      currentX: 0,
      points: [0, 200, 0, 200],
      layer: { x: 0, y: 0 },
      stage: { width: 200, height: 400 },
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
  },
  mounted() {
    this.initStage()
    let startTime = Date.now()
    let from = -10
    let to = 10

    const interval = setInterval(() => {
      this.doStep()
      let y = this.getRandomY(from, to)
      // let y = this.currentY + 1

      const offsetTop = -y + 50
      if (offsetTop > this.layer.y) {
        for (let i = 0; i < this.points.length; i++) {
          if (i % 2) this.points[i] += offsetTop
        }
        // this.points = this.points.map((c, i) => (i % 2 ? (c += offsetTop) : c))
        // this.layer.offsetY = offsetTop
      }

      const offsetBottom = y + 50 - this.stage.height
      if (offsetBottom > this.layer.y) {
        for (let i = 0; i < this.points.length; i++) {
          if (i % 2) this.points[i] -= offsetBottom
        }
        // this.points = this.points.map((c, i) => (i % 2 ? (c -= offsetBottom) : c))
        // this.layer.offsetY = offsetBottom
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
    },
    doStep() {
      if (this.layerEndsX) this.moveLayerX()
      this.currentX += step
    },
    moveLayerX() {
      this.layer.x -= step
    },
    getLastPointStart() {
      return this.points.slice(-4, 2)
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
