<template>
  <div class="pb-4 pt-2">
    <div class="font-oswald flex px-3">
      <button
        :key="'up'"
        @click="bet('up')"
        :class="{ '!bg-base-300': disabled, '!text-lime-500': side === 'up' }"
        :disabled="disabled"
        class="btn h-14 flex-1 items-center border-2 border-lime-700 bg-lime-500 text-3xl font-bold uppercase leading-none text-white"
        type="button"
      >
        <IconsLock v-show="disabled && side !== 'up'" class="h-8 w-8" />
        <IconsTriangle v-show="!disabled || side === 'up'" class="h-8 w-8" />
      </button>

      <Timer class="mx-2" />

      <button
        :key="'down'"
        @click="bet('down')"
        :class="{ '!bg-base-300': disabled, '!text-red-500': side === 'down' }"
        :disabled="disabled"
        class="btn h-14 flex-1 border-2 border-red-700 bg-red-500 pb-1 text-3xl font-bold uppercase leading-none text-white"
        type="button"
      >
        <IconsLock v-show="disabled && side !== 'down'" class="h-8 w-8" />
        <IconsTriangle v-show="!disabled || side === 'down'" class="h-8 w-8 rotate-180" />
      </button>
    </div>

    <div class="grid h-8 grid-cols-3 gap-2 px-4 pt-3">
      <div></div>

      <div v-show="round_status" class="font-oswald text-center leading-none">
        <span class="opacity-50">Bet:</span>
        <img
          :src="`/${standings.length ? 'point' : 'coin'}.png`"
          class="align-center mb-1 ml-2 inline-block inline h-4 w-4"
          alt=""
        />
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
      side: null,
    }
  },

  computed: {
    ...mapState(useRoomStore, ['round_status', 'userRating', 'winRates', 'winner_side', 'standings']),
    ...mapState(useUserStore, ['user']),

    disabled() {
      return this.side || this.round_status !== 'open'
    },

    balance() {
      return this.userRating.balance || this.user.balance
    },

    rateAmount() {
      const rate = +this.rate ? Math.ceil((this.balance / 100) * this.rate) : 1
      return rate > 1 ? rate : 1
    },
  },

  methods: {
    ...mapActions(useWalletStore, ['placeBet']),
    ...mapActions(useRoomStore, ['addPlayer']),

    async bet(side) {
      if (!this.balance || this.balance < this.rateAmount) {
        this.$refs.modal.showModal()
        return
      }
      this.$toast.success(`${this.rateAmount} for ${side} is placed!`)
      this.addPlayer(side)
      this.side = side
      const { down_total, up_total } = await this.placeBet(side, this.rateAmount)

      // temporary
      useRoomStore().$patch({
        treasury: {
          up: up_total,
          down: down_total,
        },
      })
    },

    manageWinner() {
      if (this.side === this.winner_side) {
        confetti({
          particleCount: 100,
          spread: 30,
          origin: {
            x: this.side === 'up' ? 0.25 : 0.75,
            y: 0.8,
          },
          gravity: 4,
        })
      }
    },
  },

  watch: {
    round_status(round_status) {
      if (round_status === 'open') this.side = null
      if (this.winner_side) this.manageWinner()
    },
  },
}
</script>
