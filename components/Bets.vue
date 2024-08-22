<template>
  <div>
    <div class="font-oswald flex px-2">
      <button
        :key="'up'"
        @click="bet('up')"
        :disabled="disabled"
        class="btn mx-2 h-14 flex-1 items-center border-2 border-lime-700 bg-lime-500 text-3xl font-bold uppercase leading-none text-white"
        type="button"
      >
        <IconsLock v-show="disabled" class="h-8 w-8" />
        <IconsTriangle v-show="!disabled" class="h-8 w-8" />
      </button>

      <Timer />

      <button
        :key="'down'"
        @click="bet('down')"
        :disabled="disabled"
        class="btn mx-2 h-14 flex-1 border-2 border-red-700 bg-red-500 pb-1 text-3xl font-bold uppercase leading-none text-white"
        type="button"
      >
        <IconsLock v-show="disabled" class="h-8 w-8" />
        <IconsTriangle v-show="!disabled" class="h-8 w-8 rotate-180" />
      </button>
    </div>

    <div class="grid grid-cols-3 gap-2 px-4 pt-2">
      <div></div>

      <div class="font-oswald text-center leading-none">
        {{ rateAmount }}
      </div>

      <div></div>
    </div>

    <div class="grid grid-cols-[auto_1fr_auto] gap-4 px-4">
      <div>
        <span class="font-bold text-green-500">Min</span>
      </div>
      <div>
        <input
          v-model="rate"
          :max="100"
          class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 bg-gradient-to-r from-green-300 via-yellow-300 to-red-300 accent-white"
          min="0"
          step="1"
          type="range"
        />
      </div>
      <div>
        <span class="font-bold text-red-500">Max</span>
      </div>
    </div>

    <dialog class="modal" ref="modal">
      <ModalsDeposit />
    </dialog>
  </div>
</template>

<script>
import confetti from 'canvas-confetti'
import { mapActions, mapState } from 'pinia'

export default {
  data() {
    return {
      rate: 5,
      sides: {},
    }
  },

  computed: {
    ...mapState(useRoomStore, ['round_status', 'userRating', 'winRates']),
    ...mapState(useUserStore, ['user']),

    disabled() {
      return this.round_status !== 'open'
    },

    balance() {
      return this.userRating.balance || this.user.balance
    },

    rateAmount() {
      return +this.rate ? Math.ceil((this.balance / 100) * this.rate) : 1
    },
  },

  methods: {
    ...mapActions(useWalletStore, ['placeBet']),
    ...mapActions(useRoomStore, ['addPlayer']),

    async bet(side) {
      if (this.balance < this.rateAmount) {
        this.$refs.modal.showModal()
        return
      }
      this.$toast.success(`${this.rateAmount} for ${side} is placed!`)
      this.addPlayer(side)
      this.sides[side] = true
      const { down_total, up_total } = await this.placeBet(side, this.rateAmount)

      // temporary
      useRoomStore().$patch({
        treasury: {
          up: up_total,
          down: down_total,
        },
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
  },

  beforeUnmount() {
    this.$bus.off('winner', this.manageWinner)
  },
}
</script>
