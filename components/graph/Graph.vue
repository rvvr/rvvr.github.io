<template>
  <div class="flex-1" ref="graph">
    <client-only>
      <v-stage :config="stage">
        <v-layer :config="layer">
          <GraphBottomRect :stage="stage"></GraphBottomRect>
          <GraphTopRect :currentY="currentY" :stage="stage"></GraphTopRect>
          <v-line v-for="(xLine, i) in xLines" :config="xLine" :key="i"></v-line>
          <v-text v-for="(xLineLabel, i) in xLinesLabels" :config="xLineLabel" :key="i"></v-text>
          <GraphDelimiter :currentY="currentY" :stage="stage"></GraphDelimiter>
          <GraphLine :points="points" :stage="stage"></GraphLine>
          <GraphLineEnd :currentX="currentX" :currentY="currentY"></GraphLineEnd>
          <GraphTopText :stage="stage" :text="`UP OR DOWN\nPLACE YOUR TRADE!`"></GraphTopText>
          <GraphLivePrice :currentY="currentY" :rate="rate" :stage="stage"></GraphLivePrice>
        </v-layer>
      </v-stage>
    </client-only>
  </div>
</template>

<script>
import { xLine, xLinesLabel } from './graphData'

const step = 3
const period = 800
const ratio = 20 // pixels for dollar
const xLinesCount = 100
const moneyBetween = 50000

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
    }
  },
  computed: {
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

    const interval = setInterval(() => {
      this.doStep()

      let newRate = this.rate + this.randomize(-20000, 20000)
      const change = this.rate - newRate
      let y = this.currentY + (change / 10000) * ratio

      // if (Date.now() - startTime > period) {
      this.rate = newRate
      this.addPoint(this.currentX, y)
      startTime = Date.now()
      // }

      // animations
      // else if (!((Date.now() - startTime) % (period / 100))) {
      //   this.setLastPointEnd(this.currentX, y)
      // } else {
      //   this.setLastPointEnd(this.currentX, this.currentY)
      // }

      if (y < 100 || y > this.stage.height - 100) {
        // graph
        for (let i = 0; i < this.points.length; i++) {
          if (i % 2) {
            this.points[i] -= (change / 10000) * ratio
          }
        }

        // lines
        for (let i = 0; i < this.xLines.length; i++) {
          this.xLinesLabels[i].y -= (change / 10000) * ratio

          for (let j = 0; j < this.xLines[i].points.length; j++)
            if (j % 2) {
              this.xLines[i].points[j] -= (change / 10000) * ratio
            }
        }
      }
    }, 100)
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
      for (let i = 0; i < this.points.length; i++) {
        if (!(i % 2)) {
          this.points[i] -= step
        }
      }
      if (this.points.length > 100) {
        this.points = this.points.slice(4)
      }
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
