<template>
  <div class="font-oswald grid grid-cols-[1fr_56px_1fr] gap-4 px-4 py-1">
    <button
      :key="'up'"
      @click="bet('up', rate)"
      :disabled="disabled"
      class="btn h-14 border-2 border-lime-700 bg-lime-500 text-3xl font-bold uppercase text-white"
    >
      <IconsLock v-show="disabled" class="h-8 w-8" />
      <span v-show="!disabled">{{ 'up' }}</span>
    </button>

    <Timer />

    <button
      :key="'down'"
      @click="bet('down', rate)"
      :disabled="disabled"
      class="btn h-14 border-2 border-red-700 bg-red-500 text-3xl font-bold uppercase text-white"
    >
      <IconsLock v-show="disabled" class="h-8 w-8" />
      <span v-show="!disabled">{{ 'down' }}</span>
    </button>
  </div>

  <div class="grid grid-cols-7 gap-2 px-4 pb-5 pt-2">
    <button
      v-for="(btnRate, i) in rates"
      :key="i"
      @click="rate = btnRate"
      :class="[btnRate === rate ? 'btn-outline pointer-events-none text-neutral-content' : '']"
      class="font-oswald btn btn-neutral btn-sm border-2"
    >
      {{ btnRate }}
    </button>
  </div>

  <dialog class="modal" ref="modal">
    <ModalsDeposit />
  </dialog>
</template>

<script>
import confetti from 'canvas-confetti'
import { mapActions, mapState } from 'pinia'

export default {
  data() {
    return {
      rate: 5,
      rates: [5, 10, 15, 25, 50, 100, 200],
      sides: {},
    }
  },

  computed: {
    ...mapState(useRoomStore, ['round_status', 'userRating']),
    ...mapState(useUserStore, ['user']),

    disabled() {
      return this.round_status !== 'open'
    },

    balance() {
      return this.userRating.balance || this.user.balance
    },
  },

  methods: {
    ...mapActions(useWalletStore, ['placeBet']),
    ...mapActions(useRoomStore, ['addPlayer']),

    async bet(side, rate) {
      // if (this.balance < 1) {
      //   this.$refs.modal.showModal()
      //   return
      // }
      this.$toast.success(`${rate} for ${side} is placed!`)
      this.addPlayer(side)
      this.sides[side] = true
      const { down_total, up_total } = await this.placeBet(side, rate)

      const total = down_total + up_total

      // temporary
      useRoomStore().$patch({
        treasury: {
          up: up_total,
          down: down_total,
        },
        // winRates: {
        //   up: total / (up_total / 100) / 100,
        //   down: total / (up_total / 100) / 100,
        // },
      })
    },

    manageWinner(side, sides) {
      if (this.sides[side]) {
        confetti({
          particleCount: 100,
          spread: 30,
          origin: {
            x: side === 'up' ? 0.25 : 0.75,
            y: 0.8,
          },
          gravity: 4,
        })
      }
      this.sides = {}
    },
  },

  mounted() {
    this.$bus.on('winner', this.manageWinner)
    // this.$refs.modal.showModal()
  },

  unmounted() {
    this.$bus.off('winner', this.manageWinner)
  },
}
</script>
