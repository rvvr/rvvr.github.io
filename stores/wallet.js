export const useWalletStore = defineStore('wallet', {
  actions: {
    async placeBet(bet_side, bet_amount, user_id) {
      await api.post('/bet', { bet_amount, bet_side, user_id })
    },
  },
})
