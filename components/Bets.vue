<template>
  <div class="font-oswald grid grid-cols-2 gap-4 px-4 py-1">
    <button
      :class="upClasses"
      :disabled="upDisabled"
      class="up btn h-16 border-2 border-lime-700 bg-lime-500 text-3xl font-bold uppercase text-white"
    >
      Up
    </button>
    <button
      :class="downClasses"
      :disabled="downDisabled"
      class="down btn h-16 border-2 border-red-700 bg-red-500 text-3xl font-bold uppercase text-white"
    >
      Down
    </button>
  </div>
  <div class="grid grid-cols-7 gap-2 p-4">
    <button
      v-for="bet in bets"
      @click="betRate = bet"
      :class="[bet === betRate ? 'text-white' : 'btn-outline']"
      :disabled="disabled"
      :key="bet"
      class="font-oswald btn btn-success border-2 text-lg"
    >
      {{ bet }}
    </button>
  </div>
</template>

<script>
import confetti from 'canvas-confetti'

export default {
  props: ['state'],
  data() {
    return {
      upClasses: '',
      downClasses: '',
      upDisabled: false,
      downDisabled: false,
      disabled: false,
      betRate: 5,
      bets: [5, 10, 15, 25, 50, 100, 200],
    }
  },
  mounted() {
    this.$bus.on('start', () => {
      if (this.state.mode === 'before') {
        this.upDisabled = false
        this.downDisabled = false
        this.disabled = false
      }
      if (this.state.mode === 'active') {
        this.upDisabled = true
        this.downDisabled = true
        this.disabled = true
      }
    })

    this.$bus.on('winner', (isUp) => {
      const x = isUp ? 0.25 : 0.75
      confetti({
        particleCount: 50,
        spread: 30,
        origin: { x, y: 0.8 },
        gravity: 4,
      })

      this[isUp ? 'upClasses' : 'downClasses'] = 'animate-bounce'
      this[!isUp ? 'upClasses' : 'downClasses'] = ''
      this[!isUp ? 'downDisabled' : 'upDisabled'] = false

      setTimeout(() => {
        this.upClasses = this.downClasses = ''
      }, 5000)
    })
  },
}
</script>

<style>
/* .down {
  box-shadow:
    0 3px 0 0px rgba(190, 31, 31, 0.95),
    0 4px 0 0px rgb(119, 0, 0);
}
.up {
  box-shadow:
    0 3px 0 0px rgba(88, 145, 30, 0.95),
    0 4px 0 0px rgb(50, 71, 21);
} */
</style>
