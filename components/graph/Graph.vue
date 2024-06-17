<template>
  <div class="graph-wrap flex-1" ref="graph">
    <client-only>
      <v-stage :config="stage">
        <v-layer :config="{ x: 0, y: 0 }">
          <GraphBottomRect :stage="stage" />
          <GraphTopRect :currentY="freezeY || currentY" :stage="stage" />
          <GraphBack :stage="stage" />

          <v-line v-for="(xLine, i) in xLines" :config="xLine" :key="i" />
          <v-text v-for="(xLineLabel, i) in xLinesLabels" :config="xLineLabel" :key="i" />

          <GraphLine :points="points" :stage="stage" />
          <GraphLineEnd :currentX="currentX" :currentY="currentY" />

          <GraphDelimiter :currentY="freezeDelimiter || currentY" :stage="stage" />
          <GraphStart :stage="stage" :x="startX || -50" />
          <GraphFinish :stage="stage" :x="finishX || -50" />
          <GraphLivePrice :currentY="currentY" :price="livePrice" :rate="rate" :stage="stage" />
          <!-- <GraphShadow :stage="stage" /> -->
        </v-layer>
      </v-stage>
    </client-only>
  </div>
</template>

<script>
import { xLine, xLinesLabel } from './graphData'

const step = 2
const xLinesCount = 100
const ratio = 20 // pixels for unit
const moneyBetween = 5_0000
const overflowSpace = 75
const divider = 1_0000 // how much decimals

export default {
  props: ['state'],
  data() {
    return {
      rate: 70_000_0000,
      currentX: 0,
      points: [0, 0, 0, 0],
      stage: { width: 0, height: 0 },
      // lines
      xLines: [],
      xLinesLabels: [],
      freezeY: null,
      startX: null,
      finishX: null,
      freezeDelimiter: null,
    }
  },
  mounted() {
    this.initStage()
    this.$bus.on('nanoSec', this.manageGraph)
    this.$bus.on('start', this.manageEvent)
  },
  computed: {
    message() {
      return false
    },
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
      if (this.currentX >= this.stage.width / 2) {
        this.moveLayer(0, step / 2)
        setTimeout(() => {
          this.moveLayer(0, step / 2)
        }, 50)

        if (this.startX && this.startX > -50) {
          this.startX -= step / 2
          setTimeout(() => {
            this.startX -= step / 2
          }, 50)
        }
        if (this.finishX && this.finishX > -50) {
          this.finishX -= step / 2
          setTimeout(() => {
            this.finishX -= step / 2
          }, 50)
        }

        if (this.points.length > 100) {
          this.points = this.points.slice(4)
        }
      } else {
        this.currentX += step
      }
    },
    moveLayer(start, step) {
      for (let i = start; i < this.points.length; i += 2) {
        this.points[i] -= step
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

        if (this.freezeY) this.freezeY -= needMove
        if (this.freezeDelimiter) this.freezeDelimiter -= needMove
      }
    },
    pushData() {
      let newRate = this.rate + this.randomize(10000, -10000)
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
    manageEvent() {
      if (this.state.mode === 'before') {
        this.freezeY = null
        this.freezeDelimiter = null

        this.startX = this.currentX + (this.state.left / 100) * step
        this.finishX = this.startX + 100 * step
      }
      if (this.state.mode === 'active') {
        this.freezeY = this.currentY
      }
      if (this.state.mode === 'after') {
        this.$bus.emit('winner', this.freezeY > this.currentY ? 'up' : 'down')
        this.freezeDelimiter = this.currentY
      }
    },
  },
}
</script>
