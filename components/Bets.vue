<template>
  <div class="font-oswald grid grid-cols-2 gap-4 px-4 py-1">
    <button
      v-show="activeSide != 'up'"
      @click="bet('up')"
      :disabled="disabled"
      class="btn btn-ghost h-16 border-2 border-lime-700 bg-lime-500 text-3xl font-bold uppercase text-white hover:border-lime-700 hover:bg-lime-500"
    >
      Up
    </button>
    <button
      v-show="activeSide == 'up'"
      class="btn pointer-events-none h-16 border-2 border-lime-500 text-3xl font-bold uppercase text-lime-500"
    >
      Up
    </button>

    <button
      v-show="activeSide != 'down'"
      @click="bet('down')"
      :disabled="disabled"
      class="btn h-16 border-2 border-red-700 bg-red-500 text-3xl font-bold uppercase text-white hover:border-red-700 hover:bg-red-500"
    >
      Down
    </button>
    <button
      v-show="activeSide == 'down'"
      class="btn pointer-events-none h-16 border-2 border-red-500 text-3xl font-bold uppercase text-red-500"
    >
      Down
    </button>
  </div>

  <div class="grid grid-cols-7 gap-2 p-4">
    <button
      v-for="(btnRate, i) in rates"
      :key="i"
      @click="rate = btnRate"
      :class="[btnRate === rate ? 'btn-outline pointer-events-none text-neutral-content' : '']"
      :disabled="activeSide && btnRate != activeRate"
      class="font-oswald btn btn-neutral border-2 text-lg"
    >
      {{ btnRate }}
    </button>
  </div>
</template>

<script>
import confetti from 'canvas-confetti'
import { mapActions, mapState } from 'pinia'

export default {
  data() {
    return {
      activeRate: null,
      activeSide: null,
      rate: 5,
      rates: [5, 10, 15, 25, 50, 100, 200],
    }
  },

  computed: {
    ...mapState(useRoomStore, ['round_status']),

    disabled() {
      return {
        null: true,
        open: false,
        running: true,
        closed: true,
      }[this.round_status]
    },
  },

  methods: {
    ...mapActions(useWalletStore, ['placeBet']),

    async bet(side) {
      this.activeSide = side
      this.activeRate = this.rate
      this.disabled = true
      this.$toast.success(`Trade ${this.activeRate} for ${side} is placed!`)
      await this.placeBet(this.activeSide, this.activeRate)
    },

    manageWinner(side) {
      if (this.activeSide === side) {
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
      } else if (this.activeSide) {
        this.$toast('Your trade is failed.')
      }

      this.activeSide = null
      this.activeRate = null
    },
  },

  mounted() {
    this.$bus.on('winner', this.manageWinner)
  },

  unmounted() {
    this.$bus.off('winner', this.manageWinner)
  },
}
</script>
