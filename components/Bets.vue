<template>
  <div class="font-oswald grid grid-cols-2 gap-4 px-4 py-1">
    <button
      v-show="activeBet != 'up'"
      @click="bet('up')"
      :disabled="disabled"
      class="btn btn-ghost h-16 border-2 border-lime-700 bg-lime-500 text-3xl font-bold uppercase text-white hover:border-lime-700 hover:bg-lime-500"
    >
      Up
    </button>
    <button
      v-show="activeBet == 'up'"
      class="btn pointer-events-none h-16 border-2 border-lime-500 text-3xl font-bold uppercase text-lime-500"
    >
      Up
    </button>

    <button
      v-show="activeBet != 'down'"
      @click="bet('down')"
      :disabled="disabled"
      class="btn h-16 border-2 border-red-700 bg-red-500 text-3xl font-bold uppercase text-white hover:border-red-700 hover:bg-red-500"
    >
      Down
    </button>
    <button
      v-show="activeBet == 'down'"
      class="btn pointer-events-none h-16 border-2 border-red-500 text-3xl font-bold uppercase text-red-500"
    >
      Down
    </button>
  </div>

  <div class="grid grid-cols-7 gap-2 p-4">
    <button
      v-for="bet in bets"
      @click="betRate = bet"
      :class="[bet === betRate ? 'btn-outline pointer-events-none' : '']"
      :disabled="activeBet && bet != activeBetRate"
      :key="bet"
      class="font-oswald btn border-2 text-lg"
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
      activeBetRate: null,
      activeBet: null,
      disabled: false,
      betRate: 5,
      bets: [5, 10, 15, 25, 50, 100, 200],
    }
  },
  methods: {
    bet(activeBet) {
      this.activeBet = activeBet
      this.activeBetRate = this.betRate
      this.disabled = true
    },
  },
  mounted() {
    this.$bus.on('start', () => {
      if (this.state.mode == 'active') {
        this.disabled = true
      }
    })

    this.$bus.on('winner', (isUp) => {
      this.disabled = false
      this.activeBet = null
      this.activeRate = null

      const x = isUp ? 0.25 : 0.75
      confetti({
        particleCount: 100,
        spread: 30,
        origin: { x, y: 0.8 },
        gravity: 4,
      })
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
