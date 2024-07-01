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
      v-for="(bet, i) in bets"
      :key="i"
      @click="betRate = bet"
      :class="[bet === betRate ? 'btn-outline pointer-events-none text-neutral-content' : '']"
      :disabled="activeBet && bet != activeBetRate"
      class="font-oswald btn btn-neutral border-2 text-lg"
    >
      {{ bet }}
    </button>
  </div>
</template>

<script>
import confetti from 'canvas-confetti'
import { mapActions } from 'pinia'

export default {
  data() {
    return {
      activeBetRate: null,
      activeBet: null,
      disabled: true,
      betRate: 5,
      bets: [5, 10, 15, 25, 50, 100, 200],
    }
  },

  methods: {
    ...mapActions(useWalletStore, ['placeBet']),

    async bet(activeBet) {
      this.activeBet = activeBet
      this.activeBetRate = this.betRate
      this.disabled = true
      this.$toast.success(`Trade ${this.activeBetRate} for ${activeBet} is placed!`)
      await this.placeBet(this.activeBet, this.activeBetRate)
    },

    manageStart({ round_status }) {
      if (round_status == 'running') {
        this.disabled = true
      }

      if (round_status == 'open') {
        this.disabled = false
      }
    },

    manageWinner(side) {
      if (this.activeBet === side) {
        confetti({
          particleCount: 100,
          spread: 30,
          origin: {
            x: side === 'up' ? 0.25 : 0.75,
            y: 0.8,
          },
          gravity: 4,
        })

        this.$toast('🎉 Your trade is won!')
      } else if (this.activeBet) {
        this.$toast('Your trade is failed.')
      }

      this.activeBet = null
      this.activeRate = null
    },
  },

  mounted() {
    this.$bus.on('start', this.manageStart)
    this.$bus.on('winner', this.manageWinner)
  },

  unmounted() {
    this.$bus.off('start', this.manageStart)
    this.$bus.off('winner', this.manageWinner)
  },
}
</script>
