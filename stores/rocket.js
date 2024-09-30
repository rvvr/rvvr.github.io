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
  }),

  getters: {
    userRating() {
      return this.rating?.find((c) => c.user_id === useUserStore().user.user_id) || {}
    },
    cashOutVal() {
      return Math.round(this.betPlaced * this.multiplier)
    },
    balance() {
      return this.room ? this.userRating.balance : useUserStore().user.balance
    },
  },

  actions: {
    async fetchRate() {
      const { current_price } = await api.get('/current_price')
      return current_price
    },

    async tournamentBet(bet_amount) {
      await api.post('/rocket/bet', { bet_amount, room_id: this.room })
      await this.fetchRating()
    },

    async tournamentCashOut(value) {
      await api.post('/rocket/cash-out', { value, room_id: this.room })
      await this.fetchRating()
    },

    async fetchRating() {
      this.rating = await api.get('/tournaments/standings?room_id=' + this.room)
    },
  },
})
