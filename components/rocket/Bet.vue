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
        @click="doCashOut"
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

    <BetSize v-model="betSize" :balance="balance" />

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
    ...mapWritableState(useRocketStore, ['betPlanned']),
    ...mapState(useRocketStore, ['betPlaced', 'cashOutVal', 'balance']),
  },

  created() {
    this.betSize = Math.floor(this.balance * 0.5) || 1
  },

  methods: {
    ...mapActions(useWalletStore, ['saveTaps']),
    ...mapActions(useRocketStore, ['tournamentBet', 'tournamentCashOut', 'cashOut']),

    planBet() {
      if (this.balance < this.betSize) this.$refs.infBalance.showModal()
      else this.betPlanned = this.betSize
    },
    cancelBet() {
      this.betPlanned = 0
    },
    doCashOut() {
      this.$toast.success(`Cashout ${this.cashOutVal}!`)
      this.cashOut()
    },
  },
}
</script>
