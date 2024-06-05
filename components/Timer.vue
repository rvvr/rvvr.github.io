<template>
  <div>
    <div v-show="!time" class="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-base-300">
      <span class="loading loading-ring loading-lg"></span>
    </div>
    <div
      v-show="time"
      :class="timerColor"
      :style="'--size: 6rem; --thickness: 1px; --value:' + timerProgress"
      class="radial-progress h-24 w-24 border-2 border-base-300 bg-base-300"
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
  props: ['state'],
  data() {
    return {
      time: null,
      timer: null,
    }
  },
  mounted() {
    this.$bus.on('start', this.startTimer)
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
      this.timer -= 100
      if (this.timer < 0) {
        this.timer = this.time = null
        this.$bus.off('nanoSec', this.countDown)
      }
    },
    startTimer() {
      this.$bus.off('nanoSec', this.countDown)
      this.time = this.state.time
      this.timer = this.state.left
      this.$bus.on('nanoSec', this.countDown)
    },
  },
}
</script>

<style></style>
