<template>
  <div class="font-oswald grid grid-cols-2 gap-4 px-4 py-1">
    <button
      v-for="(side, i) in ['up', 'down']"
      :key="side"
      @click="bet(side, rate)"
      :class="[i ? 'border-red-700 bg-red-500' : 'border-lime-700 bg-lime-500']"
      :disabled="disabled"
      class="btn h-16 border-2 text-3xl font-bold uppercase text-white"
    >
      <IconsLock v-show="disabled" class="h-8" />
      <span v-show="!disabled">{{ side }}</span>
    </button>
  </div>

  <div class="grid grid-cols-7 gap-2 p-4">
    <button
      v-for="(btnRate, i) in rates"
      :key="i"
      @click="rate = btnRate"
      :class="[btnRate === rate ? 'btn-outline pointer-events-none text-neutral-content' : '']"
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
      rate: 5,
      rates: [5, 10, 15, 25, 50, 100, 200],
    }
  },

  computed: {
    ...mapState(useRoomStore, ['round_status']),

    disabled() {
      // return true
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

    async bet(side, rate) {
      this.$toast.success(`${rate} for ${side} is placed!`)
      await this.placeBet(side, rate)
    },

    manageWinner(side) {
      // confetti({
      //   particleCount: 100,
      //   angle: side === 'up' ? 45 : 135,
      //   origin: {
      //     x: side === 'up' ? 0 : 1,
      //     y: 0.8,
      //   },
      // })
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
