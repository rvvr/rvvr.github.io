<template>
  <div class="relative flex-1 bg-[#09090b]" ref="graph">
    <v-stage :config="stage">
      <v-layer :config="{ x: 0, y: 0 }">
        <GraphBack :stage="stage" />
        <v-line v-for="(xLine, i) in xLines" :key="i" :config="xLine" />
        <v-text v-for="(xLineLabel, i) in xLinesLabels" :key="i" :config="xLineLabel" />

        <!-- <v-line
          :config="{
            points,
            // points: messyPoints,
            stroke: '#f4d56f',
            strokeWidth: 8,

            // shadowColor: 'yellow',
            // shadowBlur: 6,
            // shadowEnabled: true,
            // shadowOffset: { x: 0, y: 0 },
          }"
        /> -->
        <v-line
          :config="{
            points,
            // points: messyPoints,
            stroke: 'gold',
            strokeWidth: 4,
          }"
        />

        <v-line
          :config="{ points: [0, topRateY, stage.width, topRateY], stroke: '#22c55e', ...edgesConfig }"
        />
        <v-line
          :config="{ points: [0, bottomRateY, stage.width, bottomRateY], stroke: '#ef4444', ...edgesConfig }"
        />
        <v-text :config="{ fill: '#f4d56f', text: formatRate(rate), y: currentY, ...ratesConfig }" />
        <v-text :config="{ fill: '#22c55e', text: formatRate(topRate), y: topRateY, ...ratesConfig }" />
        <v-text :config="{ fill: '#ef4444', text: formatRate(bottomRate), y: bottomRateY, ...ratesConfig }" />

        <RocketIcon :currentX="currentX" :currentY="currentY" :live="notCrashed" />
        <!-- <RocketIcon :currentX="messyX" :currentY="messyY" :live="notCrashed" /> -->
      </v-layer>
    </v-stage>

    <div v-show="notCrashed" class="meteors"><span v-for="i in 6" :key="i" /></div>
  </div>
</template>

<script>
import { mapState, mapWritableState } from '~/node_modules/pinia/dist/pinia'
import { xLine, xLinesLabel } from '~/components/graph/graphData'
import throttle from 'lodash.throttle'
import random from 'lodash.random'

const step = 8
const xLinesCount = 50
const pixelsBetween = 50 // between price lines
const divider = 1_00000000 // how much decimals
const ratio = 40 // cent per pixel

const rateToPixels = ratio / divider
const pixelsToRate = divider / ratio
const randomizer = 0.2 * divider
const range = divider * 3

export default {
  data() {
    return {
      points: [0, 0, 0, 0],
      stage: { width: 0, height: 0 },
      xLines: [],
      xLinesLabels: [],

      // initial computed values
      xEdge: null,
      heightMinusOverflow: null,
      overflowSpace: null,

      // state
      topRate: null,
      topRateY: 0,
      bottomRate: null,
      bottomRateY: 0,
    }
  },

  computed: {
    ...mapWritableState(useRocketStore, ['rate', 'randomDiff', 'ds']),
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
    edgesConfig() {
      return {
        dash: [6, 6],
        strokeWidth: 1,
        offsetX: 70,
      }
    },
    ratesConfig() {
      return {
        align: 'left',
        fontFamily: 'Oswald',
        fontSize: 12,
        x: this.stage.width,
        width: 62,
        offsetX: 62,
        offsetY: 5,
        shadowColor: '#09090b',
        shadowBlur: 10,
      }
    },
    notCrashed() {
      return this.rate > this.bottomRate
    },
  },

  mounted() {
    this.ds = 0
    this.topRate = this.rate + range / 2
    this.bottomRate = this.rate - range / 2
    this.initStage()
  },

  methods: {
    run() {
      this.pushData(this.rate + this.randomDiff)
      this.setRandomDiff()
    },

    setRandomDiff: throttle(function () {
      this.randomDiff = this.randomDiff ? 0 : random(-randomizer, randomizer)
      this.ds++
    }, 100),

    initStage() {
      this.stage.width = this.$refs.graph.clientWidth
      this.stage.height = this.$refs.graph.clientHeight

      this.xEdge = Math.ceil(this.stage.width / 2)
      this.overflowSpace = Math.round(this.stage.height / 8)
      this.heightMinusOverflow = this.stage.height - this.overflowSpace

      const center = [0, ~~(this.stage.height / 2)]

      this.points = [...center, ...center]
      this.topRateY = this.currentY - (range / 2) * rateToPixels
      this.bottomRateY = this.currentY + (range / 2) * rateToPixels

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
        const rate = startPrice - i * moneyBetween
        return {
          x: this.stage.width,
          text: this.formatRate(rate),
          ...xLinesLabel,
          ...c,
        }
      })
    },

    pushData(rate = this.rate) {
      if (rate <= this.bottomRate) rate = this.bottomRate

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

      if (rate > this.topRate) {
        this.topRate = rate
        this.bottomRate = rate - range
        this.topRateY = this.currentY
        this.bottomRateY = this.currentY + range * rateToPixels
      } else if (rate <= this.bottomRate) {
        this.$emit('end')
        this.run = () => {}
      }
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

    formatRate(rate) {
      return (rate / divider).toFixed(4)
    },
  },
}
</script>

<style lang="scss">
.meteors {
  position: absolute;
  z-index: 998;
  width: calc(100%);
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
}

.meteors span {
  position: absolute;
  width: 75px;
  border-bottom: 2px solid #fff;
}

$nbmeteors: 6;
$particles-color: rgba(255, 255, 255, 0.5);

@for $i from 0 to $nbmeteors {
  $top: (100 / $nbmeteors) * ($i + 1) + '%';
  $speed: calc((random(10) + 5) / 15);

  .meteors span:nth-child(#{$i + 1}) {
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
