<template>
  <div class="relative flex-1 bg-[#09090b]" ref="graph">
    <v-stage :config="stage">
      <v-layer :config="{ x: 0, y: 0 }">
        <GraphBack :stage="stage" />
        <v-line v-for="(xLine, i) in xLines" :key="i" :config="xLine" />
        <v-text v-for="(xLineLabel, i) in xLinesLabels" :key="i" :config="xLineLabel" />

        <v-line
          :config="{
            points,
            // points: messyPoints,
            stroke: 'yellow',
            strokeWidth: 8,

            shadowColor: 'yellow',
            shadowBlur: 6,
            shadowEnabled: true,
            shadowOffset: { x: 0, y: 0 },
          }"
        />

        <!-- <v-line
          :config="{
            points,
            // points: messyPoints,
            stroke: 'gold',
            strokeWidth: 4,
            lineCap: 'round',
            lineJoin: 'round',
          }"
        /> -->

        <RocketIcon :currentX="currentX" :currentY="currentY" />
        <!-- <RocketIcon :currentX="messyX" :currentY="messyY" /> -->

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

const step = 8
const xLinesCount = 100
const pixelsBetween = 50 // between price lines
const divider = 1_00000000 // how much decimals
const ratio = 10 // cent per pixel

const rateToPixels = ratio / divider
const pixelsToRate = divider / ratio
const randomizer = 1 * divider

let RAF

export default {
  data() {
    return {
      rate: null,
      points: [],
      stage: { width: 0, height: 0 },
      xLines: [],
      xLinesLabels: [],

      // initial computed values
      xEdge: null,
      heightMinusOverflow: null,
      overflowSpace: null,

      // state
      livePrice: null,
      pushDataLoop: null,
      pushRealLoop: null,
    }
  },

  mounted() {
    this.rate = pad(70000)

    this.initStage()
    this.xEdge = Math.ceil(this.stage.width / 2)
    this.overflowSpace = Math.round(this.stage.height / 8)
    this.heightMinusOverflow = this.stage.height - this.overflowSpace

    let rndm = 0
    this.pushDataLoop = new Loop(() => this.pushData(this.rate + rndm), 20).start()

    this.pushRealLoop = new Loop(() => {
      rndm = rndm ? 0 : random(-randomizer, randomizer)
    }, 100).start()
  },

  beforeUnmount() {
    this.pushDataLoop.stop()
    this.pushRealLoop.stop()
  },

  computed: {
    ...mapState(useUserStore, ['user']),

    lastPoint() {
      return this.points.slice(-2)
    },
    currentY() {
      return this.lastPoint[1]
    },
    currentX() {
      return this.lastPoint[0]
    },
    messyPoints() {
      return this.points.map((c, i) => (i % 2 ? c + random(-1, 1) : c))
    },
    messyY() {
      return this.lastPoint[1] + random(0, 1)
    },
    messyX() {
      return this.lastPoint[0] + random(0, 1)
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

    pushData(rate = this.rate) {
      let points = [...this.points]
      let newX = this.currentX + step
      let newY = this.currentY + (this.rate - rate) * rateToPixels
      points.push(...this.lastPoint, newX, newY)

      let diffX = newX > this.xEdge ? step : 0
      if (diffX) points.splice(0, 4)

      let diffY = 0
      if (newY > this.heightMinusOverflow) diffY = newY - this.heightMinusOverflow
      else if (this.overflowSpace > newY) diffY = newY - this.overflowSpace

      for (let i = 0; i < points.length; i++) points[i] -= i % 2 ? diffY : diffX
      this.moveLines(diffY)
      this.points = points
      this.rate = rate
    },

    movePoints(points, diffX, diffY) {
      for (let i = 0; i < this.points.length; i++) this.points[i] -= i % 2 ? diffY : diffX
    },
    moveLines(diffY) {
      if (!diffY) return
      const xLinesLabels = [...this.xLinesLabels]
      const xLines = [...this.xLines]
      for (let i = 0; i < this.xLines.length; i++) {
        xLinesLabels[i].y -= diffY
        xLines[i].points[1] -= diffY
        xLines[i].points[3] -= diffY
      }
      this.xLinesLabels = [...xLinesLabels]
      this.xLines = [...xLines]
    },
  },
}
</script>

<style lang="scss">
.meteors-container {
  position: absolute;
  z-index: 998;
  width: calc(100%);
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
