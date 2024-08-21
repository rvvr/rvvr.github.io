<template>
  <div>
    <div
      v-if="timer > 0"
      :class="timerColor"
      :style="'--thickness: 3px;--size:3.5rem;--value:' + timerProgress"
      class="radial-progress border-base-300 bg-[#09090b] bg-opacity-60"
      role="progressbar"
    >
      <div v-show="time" class="-mt-1 flex flex-col text-center">
        <div class="flex items-baseline justify-center font-mono">
          <span class="text-2xl leading-none">
            {{ timerDisplay }}
          </span>
          <span v-show="timerProgress > 75" class="text-xs">.{{ timerDecimals }}</span>
        </div>
        <span class="text-xs leading-none text-white opacity-50">sec</span>
      </div>
    </div>

    <div v-else class="flex h-14 w-14 items-center justify-center rounded-full bg-[#09090b] bg-opacity-60">
      <span class="loading loading-ring loading-lg"></span>
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
    stopTimer() {
      this.time = null
      this.timer = null
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
