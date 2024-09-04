<template>
  <div class="graph-wrap relative flex-1 bg-[#09090b]" ref="graph">
    <client-only>
      <v-stage :config="stage">
        <v-layer :config="{ x: 0, y: 0 }">
          <GraphBottomRect
            v-if="roundStatus != 'open'"
            :current-x="currentX"
            :currentY="currentY"
            :finish="finishX"
            :freeze-y="freezeY"
            :stage="stage"
            :start="startX"
          />
          <GraphTopRect
            v-if="roundStatus != 'open'"
            :current-x="currentX"
            :currentY="currentY"
            :finish="finishX"
            :freeze-y="freezeY"
            :stage="stage"
            :start="startX"
          />
          <GraphBack :stage="stage" />

          <v-line v-for="(xLine, i) in xLines" :key="i" :config="xLine" />

          <GraphVertLine :stage="stage" :x="startX" />
          <GraphVertLine :stage="stage" :x="finishX" />

          <v-text v-for="(xLineLabel, i) in xLinesLabels" :key="i" :config="xLineLabel" />

          <GraphLine :points="points" :stage="stage" />
          <GraphLineEnd :currentX="currentX" :currentY="currentY" />

          <GraphLivePrice
            v-if="rate"
            :currentY="currentY"
            :freeze-y="freezeY"
            :price="livePrice"
            :rate="rate"
            :roundStatus="roundStatus"
            :stage="stage"
          />
          <GraphShadow :stage="stage" />

          <GraphStart :stage="stage" :x="startX" />
          <GraphFinish :stage="stage" :x="finishX" />
          <GraphWinnerSign
            v-if="roundStatus === 'closed'"
            :finishX="finishX"
            :freezeY="freezeY"
            :startX="startX"
            :winSide="winSide"
          />
        </v-layer>
      </v-stage>
    </client-only>

    <MessageBox :winSide="winSide" class="absolute bottom-2" />
  </div>
</template>

<script>
import { xLine, xLinesLabel } from './graphData'
import random from 'lodash.random'
import { mapState } from 'pinia'

const step = 2
const xLinesCount = 200
const ratio = 10 // pixels for unit
const randomizer = 30_0000000
const divider = 1_00000000 // how much decimals
const overflowSpace = 100

const moneyBetween = (50 / ratio) * divider
const tempo = Math.floor(xLinesCount / 2)

export default {
  data() {
    return {
      realRate: null,
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
      roundStatus: null,
      stageReady: false,
    }
  },

  computed: {
    ...mapState(useRoomStore, ['current_price']),

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
    initStage(rate) {
      this.stage.width = this.$refs.graph.clientWidth
      this.stage.height = this.$refs.graph.clientHeight
      const center = [0, this.stage.height / 2]
      this.points = [...center, ...center]

      const pixelsBetween = this.calcRateToPixels(moneyBetween)
      const startY = center[1] - tempo * pixelsBetween

      const arrLines = [...Array(xLinesCount)].map((c, i) => ({
        y: startY + i * pixelsBetween,
      }))

      this.xLines = arrLines.map((c, i) => ({
        points: [0, c.y, this.stage.width, c.y],
        ...xLine,
      }))

      const startPrice = rate + tempo * moneyBetween
      this.xLinesLabels = arrLines.map((c, i) => {
        return {
          x: this.stage.width,
          text: this.convert(startPrice - i * moneyBetween).toFixed(4),
          ...xLinesLabel,
          ...c,
        }
      })
      this.stageReady = true
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

      this.handleYOverflow()
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
    calcRateToPixels(rate) {
      return this.convert(rate) * ratio
    },
    manageEvent({ round_status, startRate, endRate, winner_side, left, next }) {
      this.roundStatus = round_status
      this.liveRate = pad(+endRate || +startRate)

      this.pushData(this.liveRate)

      if (!this.stageReady) {
        this.initStage(this.liveRate)
        this.$bus.on('nanoSec', this.pushData)
      }

      if (round_status === 'open') {
        this.startX = this.currentX + (left / 100) * step
        this.finishX = null
      }

      if (round_status === 'running') {
        this.finishX = null
        this.startX = this.currentX
        this.freezeY = this.currentY
      }
      if (round_status === 'closed') {
        this.finishX = this.currentX
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
      }, 100)
    },
    manageWinner(side) {
      this.winSide = side
    },
    pushData(rate) {
      const newRate = rate || random(this.rate - randomizer, this.rate + randomizer)

      const change = this.rate ? this.calcRateToPixels(this.rate - newRate) : 0
      this.addPoint(this.currentY + change)

      // do not change
      this.rate = newRate
      this.doStep()
    },
  },

  watch: {
    current_price(val) {
      if (val) this.pushData(pad(+val))
    },
  },

  mounted() {
    this.$bus.on('start', this.manageEvent)
    this.$bus.on('winner', this.manageWinner)
  },
  beforeUnmount() {
    this.$bus.off('nanoSec', this.pushData)
    this.$bus.off('start', this.manageEvent)
    this.$bus.off('winner', this.manageWinner)
  },
}
</script>
