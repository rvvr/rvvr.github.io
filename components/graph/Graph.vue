<template>
  <div class="graph-wrap relative flex-1 bg-[#09090b]" ref="graph">
    <!-- <Timer class="absolute left-1/2 top-1/2 z-10 -ml-7 -mt-7" /> -->
    <client-only>
      <v-stage :config="stage">
        <v-layer :config="{ x: 0, y: 0 }">
          <GraphBottomRect
            :current-x="currentX"
            :currentY="currentY"
            :finish="finishX"
            :freeze-y="freezeY"
            :stage="stage"
            :start="startX"
          />
          <GraphTopRect
            :current-x="currentX"
            :currentY="currentY"
            :finish="finishX"
            :freeze-y="freezeY"
            :stage="stage"
            :start="startX"
          />
          <GraphBack :stage="stage" />

          <v-line v-for="(xLine, i) in xLines" :key="i" :config="xLine" />
          <v-text v-for="(xLineLabel, i) in xLinesLabels" :key="i" :config="xLineLabel" />

          <GraphLine :points="points" :stage="stage" />
          <GraphLineEnd :currentX="currentX" :currentY="currentY" />

          <GraphVertLine :stage="stage" :x="startX" />
          <GraphVertLine :stage="stage" :x="finishX" />

          <GraphLivePrice
            :currentY="currentY"
            :price="livePrice"
            :rate="rate"
            :sideHightLighted="sideHightLighted"
            :stage="stage"
          />
          <GraphShadow :stage="stage" />

          <GraphStart v-if="startX != null" :stage="stage" :x="startX" />
          <GraphFinish v-if="finishX != null" :stage="stage" :x="finishX" />
          <GraphWinnerSign :finishX="finishX" :freezeY="freezeY" :startX="startX" :winSide="winSide" />
        </v-layer>
      </v-stage>
    </client-only>

    <MessageBox :winSide="winSide" class="absolute bottom-2" />
  </div>
</template>

<script>
import { xLine, xLinesLabel } from './graphData'

const step = 2
const xLinesCount = 100
const ratio = 4 // pixels for unit
const divider = 1_00000000 // how much decimals
const moneyBetween = 15 * divider
const overflowSpace = 60

export default {
  data() {
    return {
      liveRate: null,
      rate: null,
      currentX: 0,
      points: [0, 0, 0, 0],
      stage: { width: 0, height: 0 },
      xLines: [],
      xLinesLabels: [],
      freezeY: null,
      startX: null,
      finishX: null,
      winSide: null,
    }
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
    sideHightLighted() {
      const running = this.startX && !this.finishX
      const winningSide = this.currentY > this.freezeY ? 'down' : 'up'
      return running ? winningSide : false
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
          x: this.stage.width,
          text: this.convert(startPrice - i * moneyBetween).toFixed(4),
          ...xLinesLabel,
          ...c,
        }
      })
    },
    doStep() {
      if (this.currentX >= this.stage.width - 100) {
        this.moveLayer(0, step / 2)
        setTimeout(() => this.moveLayer(0, step / 2), 50)

        if (this.startX !== null) {
          this.startX -= step / 2
          setTimeout(() => this.startX && (this.startX -= step / 2), 50)
        }
        if (this.finishX !== null) {
          this.finishX -= step / 2
          setTimeout(() => this.finishX && (this.finishX -= step / 2), 50)
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
    addPoint(y = this.currentY) {
      this.points = this.points.concat([...this.lastPointEnd, this.currentX, y])
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
      }
    },

    manageGraph() {
      this.pushData()
      this.doStep()
      this.handleYOverflow()
    },
    calcRateToPixels(rate) {
      return this.convert(rate) * ratio
    },
    manageEvent({ round_status, left, next }) {
      if (round_status === 'open') {
      }

      if (round_status === 'running') {
        this.finishX = null

        this.startX = this.currentX
        this.freezeY = this.currentY
        // this.finishX = this.startX + (left / 100) * step
      }
      if (round_status === 'closed') {
        this.finishX = this.currentX
        this.$bus.emit('winner', this.freezeY > this.currentY ? 'up' : 'down')
      }

      this.centralize()
    },

    centralize() {
      const needMove = this.stage.height / 2 - this.currentY

      let count = 0
      const intervalId = setInterval(() => {
        this.moveLayer(1, -needMove / 20)
        this.moveLines(-needMove / 20)
        if (this.freezeY) this.freezeY += needMove / 20

        count++
        if (count === 20) clearInterval(intervalId)
      }, 50)
    },

    manageWinner(side) {
      this.winSide = side
    },

    pushData() {
      this.addPoint(this.currentY + this.calcRateToPixels(this.rate - this.liveRate))
      this.rate = this.liveRate
    },
  },

  mounted() {
    TradeSocket.start((price) => {
      this.liveRate = +price * divider

      if (this.rate) return

      this.rate = this.liveRate
      this.initStage()
      this.$bus.on('nanoSec', this.manageGraph)
      this.$bus.on('start', this.manageEvent)
      this.$bus.on('winner', this.manageWinner)
    })
  },
  unmounted() {
    this.$bus.off('nanoSec', this.manageGraph)
    this.$bus.off('start', this.manageEvent)
    this.$bus.off('winner', this.manageWinner)
    TradeSocket.stop()
  },
}
</script>
