import { CHAIN, toUserFriendlyAddress } from '@tonconnect/ui'

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    wallet: {
      address: null,
      icon: null,
      balance: 0,
    },
    tonConnectUI: null,
  }),

  actions: {
    async placeBet(bet_side, bet_amount) {
      const room_id = +useRoomStore().room.id
      return await api.post('/bet', { bet_amount, bet_side, room_id })
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
      await Promise.all([this.getBalance(wallet), this.regTonAddress(this.wallet.address)])
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

    async saveTaps(taps) {
      const { balance } = await api.post('/save_taps', { taps })
      useUserStore().$patch({ user: { balance } })
    },

    async regTonAddress(wallet_address) {
      const current = useUserStore().user.wallet_address
      if (wallet_address === current) return
      await api.post('/user/wallet_address', { wallet_address })
    },

    async getRewards() {
      return await api.get('/rewards/')
    },

    async cashReward(reward_id) {
      return await api.post('/rewards/withdraw', { reward_id })
    },
  },
})
