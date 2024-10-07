export const useRocketStore = defineStore('rocket', {
  state: () => ({
    randomDiff: 0,
    rate: 0,
    ds: 0,
    multiplier: 1,
    betPlaced: 0,
    betPlanned: 0,
    rating: null,
    room: null,
    endTime: null,
    ended: false,
  }),

  getters: {
    userRating() {
      return this.rating?.find((c) => c.user_id === useUserStore().user.user_id)
    },
    isRunning() {
      return this.userRating?.is_running
    },
    cashOutVal() {
      return Math.round(this.betPlaced * this.multiplier)
    },
    balance() {
      return this.room ? this.userRating?.balance : useUserStore().user.balance
    },
  },

  actions: {
    async fetchRate() {
      const { current_price } = await api.get('/current_price')
      this.rate = pad(current_price)
    },

    async fetchRating() {
      this.rating = await api.get('/tournaments/standings?room_id=' + this.room)
    },

    async placeBet() {
      if (!this.betPlanned) return
      if (this.room) this.tournamentBet()
      else this.boostBet()
      this.betPlaced = this.betPlanned
      this.betPlanned = 0
    },

    async tournamentBet() {
      await api.post('/rocket/bet', { bet_amount: this.betPlanned, room_id: this.room })
    },

    async boostBet() {
      await useWalletStore().saveTaps(-this.betPlanned)
    },

    async cashOut() {
      if (this.room) this.tournamentCashOut()
      else this.boostCashOut()
      this.betPlaced = 0
    },

    async tournamentCashOut() {
      await api.post('/rocket/cash-out', { value: this.cashOutVal, room_id: this.room })
    },

    async boostCashOut() {
      await useWalletStore().saveTaps(this.cashOutVal)
    },

    wipeBet() {
      this.betPlaced = 0
    },
    setRoom(room) {
      this.room = room
    },
  },
})
