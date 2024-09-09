<template>
  <NavbarView class="!bg-[#09090b]">
    <template #center>
      <NuxtLink to="/home">
        <NavbarBalance :balance="user.balance" />
      </NuxtLink>
    </template>
  </NavbarView>

  <div class="relative flex-1 bg-[#09090b]" ref="graph">
    <v-stage :config="stage">
      <v-layer :config="{ x: 0, y: 0 }">
        <GraphBack :stage="stage" />
        <v-line v-for="(xLine, i) in xLines" :key="i" :config="xLine" />
        <v-text v-for="(xLineLabel, i) in xLinesLabels" :key="i" :config="xLineLabel" />
        <GraphLine :points="points" :stage="stage" />

        <!-- <v-line :config="config"></v-line> -->

        <GraphLineEnd :currentX="currentX" :currentY="currentY" />
        <GraphShadow :stage="stage" />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { mapState } from '~/node_modules/pinia/dist/pinia'
import { xLine, xLinesLabel } from '~/components/graph/graphData'
import throttle from 'lodash.throttle'
import random from 'lodash.random'

const step = 2
const xLinesCount = 200
const ratio = 10 // pixels for unit
const randomizer = 10_0000000
const divider = 1_00000000 // how much decimals
const multiplier = 0.00000001
const overflowSpace = 100
const multiplierXratio = multiplier * ratio

const moneyBetween = (50 / ratio) * divider
const tempo = Math.floor(xLinesCount / 2)

export default {
  data() {
    return {
      rate: null,
      currentX: 0,
      points: [],
      stage: { width: 0, height: 0 },
      xLines: [],
      xLinesLabels: [],

      // initial computed values
      xEdge: null,
      maxPoints: null,
      heightMinusOverflow: null,
    }
  },

  mounted() {
    // Timer.start()
    this.rate = pad(70000)
    this.initStage()
    this.xEdge = this.stage.width - 100
    this.maxPoints = this.stage.width * (4 / step)
    this.heightMinusOverflow = this.stage.height - overflowSpace

    const action = throttle(() => {
      this.pushData()
    }, 50)

    const pushData = throttle(() => {
      this.pushData(random(this.rate - randomizer, this.rate + randomizer))
    }, 50)

    const run = () => {
      // action()
      pushData()
      window.requestAnimationFrame(run)
    }
    run()

    // this.$bus.on('nanoSec', this.pushData)
  },

  beforeUnmount() {
    // Timer.stop()
    // this.$bus.off('nanoSec', this.pushData)
  },

  computed: {
    ...mapState(useUserStore, ['user']),

    lastPointEnd() {
      return this.points.slice(-2)
    },
    currentY() {
      return this.lastPointEnd[1]
    },
  },

  methods: {
    initStage() {
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

    pushData(rate) {
      this.doStep()
      if (rate) {
        const change = this.calcRateToPixels(this.rate - rate)
        this.moveY(change)
        this.rate = rate
      } else {
        this.moveY()
      }
    },
    doStep() {
      if (this.currentX >= this.xEdge) {
        this.moveLayer(0, step)
        if (this.points.length > this.maxPoints) {
          this.points = this.points.slice(4)
        }
      } else {
        this.currentX += step
      }

      this.handleYOverflow()
    },
    handleYOverflow() {
      let needMove
      // leftToBottom
      if (this.currentY > this.heightMinusOverflow) needMove = -(this.heightMinusOverflow - this.currentY)
      // leftToTop
      else if (overflowSpace > this.currentY) needMove = this.currentY - overflowSpace
      if (needMove) {
        this.moveLayer(1, needMove)
        this.moveLines(needMove)
        // if (this.freezeY) this.freezeY -= needMove
      }
    },
    convert(num) {
      return num / divider
    },
    calcRateToPixels(rate) {
      return rate * multiplierXratio
    },
    moveY(change = 0) {
      this.points = this.points.concat([...this.lastPointEnd, this.currentX, this.currentY + change])
    },
    moveLayer(start, step) {
      for (let i = start; i < this.points.length; i += 2) this.points[i] -= step
    },
    moveLines(yOffset) {
      for (let i = 0; i < this.xLines.length; i++) {
        this.xLinesLabels[i].y -= yOffset
        this.xLines[i].points[1] -= yOffset
        this.xLines[i].points[3] -= yOffset
      }
    },
  },
}
</script>
