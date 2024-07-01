<template>
  <div>
    <div v-show="!time" class="flex h-24 w-24 items-center justify-center rounded-full bg-base-300">
      <span class="loading loading-ring loading-lg"></span>
    </div>
    <div
      v-show="time"
      :class="timerColor"
      :style="'--thickness: 6px;--size:6rem;--value:' + timerProgress"
      class="radial-progress border-base-300 bg-base-300"
      role="progressbar"
    >
      <div v-show="time" class="-mt-2 flex flex-col text-center">
        <div class="flex items-baseline font-mono">
          <span class="text-4xl leading-none">
            {{ timerDisplay }}
          </span>
          <span v-show="timerProgress > 75" class="text-sm">.{{ timerDecimals }}</span>
        </div>
        <span class="leading-none text-white">sec</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: null,
      timer: null,
    }
  },

  computed: {
    timerDisplay() {
      return Math.floor(this.timer / 1000)
    },
    timerProgress() {
      const percent = this.time / 100
      return 100 - this.timer / percent
    },
    timerDecimals() {
      return `${(this.timer + 1000) % 10000}`[1]
    },
    timerColor() {
      const colors = ['text-lime-500', 'text-amber-300', 'text-red-500']
      return colors[~~(this.timerProgress / 33.3)]
    },
  },
  methods: {
    countDown() {
      this.timer -= 50
      setTimeout(() => {
        this.timer -= 50
      }, 50)
      if (this.timer < 0) {
        this.timer = this.time = null
        this.$bus.off('nanoSec', this.countDown)
      }
    },
    startTimer({ time, left }) {
      this.$bus.off('nanoSec', this.countDown)
      this.time = time
      this.timer = left
      this.$bus.on('nanoSec', this.countDown)
    },
  },

  mounted() {
    this.$bus.on('start', this.startTimer)
  },

  unmounted() {
    this.$bus.off('start', this.startTimer)
  },
}
</script>
