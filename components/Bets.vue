<template>
  <div>
    <div class="font-oswald flex px-2">
      <button
        :key="'up'"
        @click="bet('up', rate)"
        :disabled="disabled"
        class="btn mx-2 h-14 flex-1 border-2 border-lime-700 bg-lime-500 text-3xl font-bold uppercase text-white"
      >
        <IconsLock v-show="disabled" class="h-8 w-8" />
        <span v-show="!disabled">{{ 'up' }}</span>
      </button>

      <!-- <div class="relative">
        <div class="bottom-2 mb-2 mt-1 w-full text-center text-xs leading-none text-white opacity-50">
          Wager
        </div>

        <select
          v-model="rate"
          class="select select-bordered h-8 min-h-0 appearance-none bg-none px-2 text-center focus:outline-none"
        >
          <option v-for="(btnRate, i) in rates" :key="i" :value="btnRate">{{ btnRate }}%</option>
        </select>
      </div> -->

      <Timer />

      <button
        :key="'down'"
        @click="bet('down', rate)"
        :disabled="disabled"
        class="btn mx-2 h-14 flex-1 border-2 border-red-700 bg-red-500 text-3xl font-bold uppercase text-white"
      >
        <IconsLock v-show="disabled" class="h-8 w-8" />
        <span v-show="!disabled">{{ 'down' }}</span>
      </button>
    </div>

    <!-- <div :class="`grid-cols-${rates.length}`" class="grid gap-2 px-4 pt-2">
      <button
        v-for="(btnRate, i) in rates"
        :key="i"
        @click="rate = btnRate"
        :class="[btnRate === rate ? 'btn-outline pointer-events-none text-neutral-content' : '']"
        class="font-oswald btn btn-neutral btn-sm border-2"
      >
        {{ btnRate }}%
      </button>
    </div> -->

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
      rate: 10,
      rates: [10, 25, 50, 100],
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
      if (this.balance < 1) {
        this.$refs.modal.showModal()
        return
      }
      this.$toast.success(`${rate} for ${side} is placed!`)
      this.addPlayer(side)
      this.sides[side] = true
      const { down_total, up_total } = await this.placeBet(side, rate)

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

  unmounted() {
    this.$bus.off('winner', this.manageWinner)
  },
}
</script>
