import { CHAIN, toUserFriendlyAddress } from '@tonconnect/ui'

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    wallet: {
      address: null,
      icon: null,
      balance: 0,
    },
  }),

  actions: {
    // async fetchBalance() {
    //   const balance = await api.get('/balance')
    // },

    async placeBet(bet_side, bet_amount) {
      const user_id = useUserStore().user.user_id
      const room_id = +useRoomStore().room.id
      await api.post('/bet', { bet_amount, bet_side, user_id, room_id })
    },

    getWalletAddress(wallet) {
      this.wallet.address = toUserFriendlyAddress(
        wallet.account.address,
        wallet.account.chain === CHAIN.TESTNET,
      )
    },

    async onLogin(wallet) {
      this.wallet.icon = wallet.imageUrl
      this.getWalletAddress(wallet)
      await this.getBalance(wallet)
    },

    onLogout() {
      this.wallet = {}
    },

    async getBalance(wallet) {
      const { result } = await $fetch(
        'https://toncenter.com/api/v2/getAddressBalance?address=' + wallet.account.address,
      )
      this.wallet.balance = result / 1000000000
    },
  },
})
