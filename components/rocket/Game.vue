<template>
  <div class="relative flex-1 bg-[#09090b]" ref="graph">
    <v-stage :config="stage">
      <v-layer :config="{ x: 0, y: 0 }">
        <GraphBack :stage="stage" />
        <v-line v-for="(xLine, i) in xLines" :key="i" :config="xLine" />
        <v-text v-for="(xLineLabel, i) in xLinesLabels" :key="i" :config="xLineLabel" />

        <v-line
          :config="{
            points: messyPoints,
            stroke: 'yellow',
            strokeWidth: 8,

            shadowColor: 'yellow',
            shadowBlur: 6,
            shadowEnabled: true,
            shadowOffset: { x: 0, y: 0 },
          }"
        />

        <v-line
          :config="{
            points: messyPoints,
            stroke: 'gold',
            strokeWidth: 4,
            lineCap: 'round',
            lineJoin: 'round',
          }"
        />

        <RocketIcon :currentX="messyX" :currentY="messyY" />

        <GraphLivePrice v-if="rate" :currentY="currentY" :price="livePrice" :stage="stage" />
      </v-layer>
    </v-stage>

    <div class="meteors-container">
      <span></span><span></span><span></span><span></span><span></span><span></span>
    </div>
  </div>
</template>

<script>
import { mapState } from '~/node_modules/pinia/dist/pinia'
import { xLine, xLinesLabel } from '~/components/graph/graphData'
import throttle from 'lodash.throttle'
import random from 'lodash.random'

const step = 4
const xLinesCount = 100
const pixelsBetween = 50 // between price lines
const divider = 1_00000000 // how much decimals
const ratio = 10 // cent per pixel

const rateToPixels = ratio / divider
const pixelsToRate = divider / ratio
const randomizer = 10 * divider

let RAF

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
      heightMinusOverflow: null,
      overflowSpace: null,

      // state
      busy: false,
      livePrice: null,
      liveRate: null,
      pushDataLoop: null,
      pushRateLoop: null,
      // messyX: null,
      // messyY: null
    }
  },

  mounted() {
    this.rate = pad(70000)
    this.liveRate = pad(70000)

    this.initStage()
    this.xEdge = Math.ceil(this.stage.width / 2)
    this.overflowSpace = Math.round(this.stage.height / 8)
    this.heightMinusOverflow = this.stage.height - this.overflowSpace

    const pushData = throttle(() => {
      Framer.stop()
      this.busy = true

      const newRate = this.rate + random(-randomizer, randomizer)
      let change = Math.abs(this.rate - newRate)
      const isNeg = newRate < this.rate

      this.livePrice = (newRate / divider).toFixed(4)

      Framer.start(() => {
        let part = random(1_0000, 6_0000_000)
        this.pushData(this.rate + (isNeg ? -part : part))
        change -= part
        if (change < 0) {
          Framer.stop()
          this.busy = false
        }
      })
    }, 400)

    // this.pushRateLoop = new Loop(() => {
    //   this.liveRate = this.rate + random(-randomizer, randomizer)
    //   this.livePrice = (this.liveRate / divider).toFixed(4)
    // }, 15000).start()

    this.pushDataLoop = new Loop(() => {
      const randVal = 1 * divider
      const rate = this.rate
      this.pushData(rate)
    }, 20).start()
  },

  beforeUnmount() {
    this.pushDataLoop.stop()
    this.pushRateLoop.stop()
  },

  computed: {
    ...mapState(useUserStore, ['user']),

    lastPointEnd() {
      return this.points.slice(-2)
    },
    currentY() {
      return this.lastPointEnd[1]
    },
    messyPoints() {
      return this.points.map((c, i) => (i % 2 ? c + random(-1, 1) : c))
    },
    messyY() {
      return this.lastPointEnd[1] + random(-1, 1)
    },
    messyX() {
      return this.currentX + random(-1, 1)
    },
  },

  methods: {
    initStage() {
      this.stage.width = this.$refs.graph.clientWidth
      this.stage.height = this.$refs.graph.clientHeight
      const center = [0, ~~(this.stage.height / 2)]
      this.points = [...center, ...center]

      const moneyBetween = pixelsBetween * pixelsToRate
      const halfXLinesCount = Math.floor(xLinesCount / 2)
      const startY = center[1] - halfXLinesCount * pixelsBetween

      const arrLines = [...Array(xLinesCount)].map((c, i) => ({
        y: startY + i * pixelsBetween,
      }))

      this.xLines = arrLines.map((c, i) => ({
        points: [0, c.y, this.stage.width, c.y],
        ...xLine,
      }))

      const startPrice = this.rate + halfXLinesCount * moneyBetween
      this.xLinesLabels = arrLines.map((c, i) => {
        const price = (startPrice - i * moneyBetween) / divider
        return {
          x: this.stage.width,
          text: price.toFixed(4),
          ...xLinesLabel,
          ...c,
        }
      })
    },

    pushData(rate) {
      this.doStep()
      const change = (this.rate - rate) * rateToPixels
      this.moveY(change)
      this.rate = rate
    },
    doStep() {
      if (this.currentX >= this.xEdge) {
        this.moveLayer(0, step)
        // this.currentX = this.xEdge
        this.points = this.points.slice(4)
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
      else if (this.overflowSpace > this.currentY) needMove = this.currentY - this.overflowSpace
      if (needMove) {
        this.moveLayer(1, needMove)
        this.moveLines(needMove)
        // if (this.freezeY) this.freezeY -= needMove
      }
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

<style lang="scss">
.meteors-container {
  position: absolute;
  z-index: 998;
  width: calc(100% - 70px);
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
}

.meteors-container span {
  position: absolute;
  width: 75px;
  border-bottom: 2px solid #fff;
}

$nbmeteors: 6;
$particles-color: #fff;

@for $i from 0 to $nbmeteors {
  $top: (100 / $nbmeteors) * ($i + 1) + '%';
  $speed: (random(10) + 5)/20;

  .meteors-container span:nth-child(#{$i + 1}) {
    top: #{$top};
    left: 100%;
    box-shadow: 0px 0px 5px $particles-color;
    animation: meterosAnim-#{$i} linear ($speed + s) infinite;
  }
  @keyframes meterosAnim-#{$i} {
    0% {
      left: 100%;
    }
    75% {
      left: calc(0% - 75px);
    }
    100% {
      left: calc(0% - 75px);
    }
  }
}
</style>
