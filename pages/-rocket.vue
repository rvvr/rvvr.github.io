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
        <!-- <GraphLine :points="points" :stage="stage" /> -->

        <v-line :config="config"></v-line>
        <v-line :config="lastLineConfig"></v-line>

        <!-- <GraphLineEnd :currentX="currentX" :currentY="currentY" /> -->
        <GraphShadow :stage="stage" />
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
import random from 'lodash.random'
import throttle from 'lodash.throttle'

const step = 100
const xLinesCount = 200
const ratio = 10 // pixels for unit
const randomizer = 50_0000000
const divider = 1_00000000 // how much decimals
const overflowSpace = 100

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
      dash: 0,
    }
  },

  mounted() {
    this.rate = pad(70000)
    this.initStage()
    const ministep = step / 10
    const edge = this.stage.width / 2 + step

    const action = throttle(() => {
      this.pushData(random(this.rate + randomizer, this.rate - randomizer))
      this.dash = 0
    }, 500)

    const smallAction = throttle(() => {
      this.dash += ministep
      if (this.currentX >= edge) {
        this.moveLayer(0, ministep)
      } else {
        this.currentX += ministep
      }
    }, 50)

    const run = () => {
      action()
      smallAction()
      window.requestAnimationFrame(run)
    }
    run()
  },

  beforeUnmount() {
    this.$bus.off('nanoSec', this.pushData)
  },

  computed: {
    ...mapState(useUserStore, ['user']),

    config() {
      return {
        points: this.points.slice(0, -4),
        // points: [5, 70, 140, 23, 250, 60],
        stroke: 'yellow',
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round',
        // shadowColor: '#151513',
        // shadowOffset: { x: -1, y: 0 },
      }
    },

    lastLineConfig() {
      const points = this.points.slice(-4)
      return {
        ...this.config,
        points,
        dash: [this.dash, 10000],
      }
    },

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
        this.addPoint(this.currentY + change)
        this.rate = rate
      } else {
        this.addPoint(this.currentY)
      }
    },

    convert(num) {
      return num / divider
    },
    calcRateToPixels(rate) {
      return this.convert(rate) * ratio
    },
    addPoint(y = this.currentY) {
      this.points = this.points.concat([...this.lastPointEnd, this.currentX, y])
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

        // if (this.freezeY) this.freezeY -= needMove
      }
    },
    doStep() {
      // if (this.currentX >= this.stage.width - 100) {
      //   this.moveLayer(0, step)
      // } else {
      //   this.currentX += step
      // }

      if (this.points.length > 100) {
        this.points = this.points.slice(4)
      }

      this.handleYOverflow()
    },
    setLastPointEnd(x, y) {
      this.points = this.points.slice(0, -2).concat([x, y])
    },
  },
}
</script>

<style lang="scss">
.meteors-container {
  position: absolute;
  z-index: 998;
  width: calc(100% - 75px);
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
