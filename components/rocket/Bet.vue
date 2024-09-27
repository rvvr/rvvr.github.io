<template>
  <div class="pb-4 pt-2">
    <div class="font-oswald px-3">
      <button
        v-if="betPlanned"
        @click="cancelBet"
        class="pb-1/2 btn h-14 w-full border-2 border-rose-700 bg-rose-500 text-xl font-bold uppercase text-white"
        type="button"
      >
        Cancel
      </button>

      <button
        v-else-if="betPlaced"
        @click="cashOut"
        class="pb-1/2 btn h-14 w-full border-2 border-amber-700 bg-amber-500 text-xl font-bold text-white"
        ref="cashOut"
        type="button"
      >
        Cash out ( {{ cashOutVal }} )
      </button>

      <button
        v-else
        @click="planBet"
        class="pb-1/2 btn h-14 w-full border-2 border-lime-700 bg-lime-500 text-xl font-bold uppercase text-white"
        type="button"
      >
        Place bet
      </button>
    </div>

    <BetSize v-model="betSize" :balance="user.balance" />

    <dialog class="modal" ref="infBalance">
      <ModalsDeposit />
    </dialog>
  </div>
</template>

<script>
import { mapState, mapWritableState, mapActions } from '~/node_modules/pinia/dist/pinia'

export default {
  data() {
    return {
      betSize: null,
    }
  },

  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapWritableState(useRocketStore, ['betPlaced', 'betPlanned']),
    ...mapState(useRocketStore, ['multiplier', 'room']),
    ...mapState(useUserStore, ['user']),

    cashOutVal() {
      return Math.round(this.betPlaced * this.multiplier)
    },
  },

  created() {
    this.betSize = 1 + Math.floor(this.user.balance * 0.5)
  },

  methods: {
    ...mapActions(useWalletStore, ['saveTaps']),
    ...mapActions(useRocketStore, ['tournamentBet', 'tournamentCashOut']),

    planBet() {
      if (this.user.balance < this.betSize) this.$refs.infBalance.showModal()
      else this.betPlanned = this.betSize
    },
    cancelBet() {
      this.betPlanned = 0
    },
    placeBet() {
      if (this.room) {
        this.tournamentBet(this.betPlanned, this.$route.params.room)
      } else {
        this.saveTaps(-this.betPlanned)
      }
      this.betPlaced = this.betPlanned
      this.betPlanned = 0
    },
    cashOut() {
      if (this.room) {
        this.tournamentCashOut(this.cashOutVal, this.$route.params.room)
      } else {
        this.saveTaps(this.cashOutVal)
      }
      this.betPlaced = 0
    },
    async end() {
      if (!this.betPlaced) return
      this.$refs.cashOut.disabled = true
      await sleep(2000)
      this.betPlaced = 0
    },
    start() {
      if (this.betPlanned) this.placeBet()
    },
  },
}
</script>
