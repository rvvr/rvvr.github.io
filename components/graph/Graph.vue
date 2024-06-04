<template>
  <div class="graph-wrap relative flex-1" ref="graph">
    <client-only>
      <v-stage :config="stage">
        <v-layer :config="{ x: 0, y: 0 }">
          <GraphBottomRect :stage="stage" />
          <GraphTopRect :currentY="currentY" :stage="stage" />
          <GraphBack :stage="stage" />

          <v-line v-for="(xLine, i) in xLines" :config="xLine" :key="i" />
          <v-text v-for="(xLineLabel, i) in xLinesLabels" :config="xLineLabel" :key="i" />

          <!-- <GraphYLine :stage="stage" :x="155" /> -->

          <GraphDelimiter :currentY="currentY" :stage="stage" />
          <GraphLine :points="points" :stage="stage" />
          <GraphLineEnd :currentX="currentX" :currentY="currentY" />

          <!-- can be one as it top level -->
          <GraphTopShadow :stage="stage" />
          <GraphBottomShadow :stage="stage" />

          <GraphLivePrice :currentY="currentY" :price="livePrice" :rate="rate" :stage="stage" />
        </v-layer>
      </v-stage>
    </client-only>

    <div class="absolute -top-10 w-full text-center">
      <span
        class="font-oswald inline-block rounded-lg bg-base-100 bg-opacity-70 px-3 py-2 text-2xl font-bold text-[#f4d56f]"
      >
        UP OR DOWN?<br />PLACE YOUR TRADE!
      </span>
    </div>
  </div>
</template>

<script>
import { xLine, xLinesLabel } from './graphData'

const step = 3
const xLinesCount = 100
const ratio = 20 // pixels for unit
const moneyBetween = 5_0000
const overflowSpace = 100
const divider = 1_0000 // how much decimals

export default {
  data() {
    return {
      rate: 70_000_0000,
      currentX: 0,
      points: [0, 0, 0, 0],
      stage: { width: 0, height: 0 },
      // lines
      xLines: [],
      xLinesLabels: [],
    }
  },
  mounted() {
    this.initStage()
    this.$bus.on('nanoSec', this.manageGraph)
  },
  computed: {
    lastPointEnd() {
      return this.points.slice(-2)
    },
    currentY() {
      return this.lastPointEnd[1]
    },
    livePrice() {
      return this.convert(this.rate).toFixed(4)
    },
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
      const pixelsBetween = this.calcRateToPixels(moneyBetween)
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
          text: this.convert(startPrice - i * moneyBetween).toFixed(4),
          ...xLinesLabel,
          ...c,
        }
      })
    },
    doStep() {
      if (this.currentX >= this.stage.width / 1.6) {
        this.moveLayer(0, step)
        if (this.points.length > 100) {
          this.points = this.points.slice(4)
        }
      } else {
        this.currentX += step
      }
    },
    moveLayer(start, offset) {
      for (let i = start; i < this.points.length; i += 2) {
        this.points[i] -= offset
      }
    },
    moveLines(yOffset) {
      for (let i = 0; i < this.xLines.length; i++) {
        this.xLinesLabels[i].y -= yOffset
        this.xLines[i].points[1] -= yOffset
        this.xLines[i].points[3] -= yOffset
      }
    },
    setLastPointEnd(x, y) {
      this.points = this.points.slice(0, -2).concat([x, y])
    },
    addPoint(x, y) {
      this.points = this.points.concat([...this.lastPointEnd, x, y])
    },
    convert(num) {
      return num / divider
    },
    handleYOverflow() {
      let needMove
      const leftToBottom = this.stage.height - overflowSpace - this.currentY
      const leftToTop = this.currentY - overflowSpace
      if (leftToBottom < 0) {
        needMove = -leftToBottom
      } else if (leftToTop < 0) {
        needMove = leftToTop
      }
      if (needMove) {
        this.moveLayer(1, needMove)
        this.moveLines(needMove)
      }
    },
    pushData() {
      let newRate = this.rate + this.randomize(20000, -20000)
      this.addPoint(this.currentX, this.currentY + this.calcRateToPixels(this.rate - newRate))
      this.rate = newRate
    },
    manageGraph() {
      this.doStep()
      this.pushData()
      this.handleYOverflow()
    },
    calcRateToPixels(rate) {
      return this.convert(rate) * ratio
    },
  },
}
</script>

<style>
.graph-wrap {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
</style>
