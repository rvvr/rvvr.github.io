<template>
  <div class="flex-1" ref="graph">
    <client-only>
      <v-stage :config="stage">
        <v-layer :config="{ x: 0, y: 0 }">
          <GraphBottomRect :stage="stage"></GraphBottomRect>
          <GraphTopRect :currentY="currentY" :stage="stage"></GraphTopRect>
          <v-line v-for="(xLine, i) in xLines" :config="xLine" :key="i"></v-line>
          <v-text v-for="(xLineLabel, i) in xLinesLabels" :config="xLineLabel" :key="i"></v-text>
          <GraphDelimiter :currentY="currentY" :stage="stage"></GraphDelimiter>
          <GraphLine :points="points" :stage="stage"></GraphLine>
          <GraphLineEnd :currentX="currentX" :currentY="currentY"></GraphLineEnd>
          <GraphTopText :stage="stage" :text="`UP OR DOWN\nPLACE YOUR TRADE!`"></GraphTopText>
          <GraphLivePrice
            :currentY="currentY"
            :price="livePrice"
            :rate="rate"
            :stage="stage"
          ></GraphLivePrice>
        </v-layer>
      </v-stage>
    </client-only>
  </div>
</template>

<script>
import { xLine, xLinesLabel } from './graphData'

const step = 3
const period = 800
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
  mounted() {
    this.initStage()
    let startTime = Date.now()

    const interval = setInterval(() => {
      let newRate = this.rate + this.randomize(-20000, 20000)

      this.doStep()
      const yOffset = this.convert(this.rate - newRate) * ratio

      let y = this.currentY + yOffset

      // if (Date.now() - startTime > period) {
      this.rate = newRate
      this.addPoint(this.currentX, y)
      // startTime = Date.now()
      // }

      // animations
      // else if (!((Date.now() - startTime) % (period / 100))) {
      //   this.setLastPointEnd(this.currentX, y)
      // } else {
      //   this.setLastPointEnd(this.currentX, this.currentY)
      // }

      // check overflow
      const isOverflow = y > this.stage.height - overflowSpace || y < overflowSpace
      if (isOverflow) {
        this.moveLayer(1, yOffset)
        this.moveLines(yOffset)
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
      const pixelsBetween = this.convert(moneyBetween) * ratio
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
      const layerEndsX = this.currentX >= this.stage.width / 2
      if (layerEndsX) {
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
  },
}
</script>
