<template>
  <div
    @click="startTimer"
    :class="timerColor"
    :style="`--size: 6rem; --thickness: 4px; --value: ` + timerProgress"
    class="radial-progress min-h-[96px] min-w-[96px] border-4 border-base-300 bg-base-300 duration-[5000ms]"
    role="progressbar"
  >
    <!-- transition-all -->
    <div class="flex flex-col text-center">
      <div class="flex items-baseline font-mono">
        <span class="leading-2 text-4xl">
          {{ timerDisplay }}
        </span>
        <span class="text-sm" v-show="timerProgress > 75">.{{ timerDecimals }}</span>
      </div>
      <span class="leading-6 text-white">sec</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 20000,
      timer: 20000,
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
    startTimer() {
      const startTime = Date.now()

      const interval = setInterval(() => {
        var elapsedTime = Date.now() - startTime
        this.timer = this.time - elapsedTime
        if (this.timer < 0) {
          clearInterval(interval)
          this.timer = this.time
        }
      }, 10)
    },
  },
  mounted() {
    this.startTimer()
  },
}
</script>

<style></style>
