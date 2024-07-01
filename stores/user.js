import { CHAIN, toUserFriendlyAddress } from '@tonconnect/ui'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      user_id: null,
      user_telegram_id: null,
      username: null,
      balance: 0,
      avatar_url: null,
    },
    appUser: {
      first_name: '',
      id: null,
      username: '',
    },
    avatar: '',

    wallet: {
      address: null,
      icon: null,
      balance: 0,
    },
  }),

  actions: {
    getUserFromApp() {
      this.appUser = { ...window.Telegram?.WebApp.initDataUnsafe.user }
    },

    async fetchUser() {
      this.user = await api.get('/user/' + this.appUser.id)
    },

    async regUser() {
      this.user = await api.post('/user', { user_telegram_id: this.appUser.id })
    },

    async updateAvatar() {
      this.user = await api.post('/user/avatar', { user_telegram_id: this.appUser.id })
    },

    async setAvatar() {
      if (this.user.avatar_url) {
        this.avatar = 'https://game.demo.cryptobull.io' + this.user.avatar_url
      } else {
        let ip = await $fetch('https://checkip.amazonaws.com/')
        this.avatar = `https://robohash.org/${ip}.png?set=set3`
      }
    },

    async fetchBalance() {
      const balance = await api.get('/balance')
    },

    async initUser() {
      this.getUserFromApp()
      if (!this.appUser.id) return

      await this.fetchUser()
      if (!this.user.user_id) {
        await this.regUser()
        // await this.fetchUser()
      }
      await this.setAvatar()
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
