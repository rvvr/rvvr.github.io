export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      user_id: null,
      user_telegram_id: null,
      username: '',
      balance: 0,
    },
    appUser: {},
  }),

  actions: {
    getUserFromApp() {
      this.appUser = { ...window.Telegram.WebApp.initDataUnsafe.user }
      console.log(this.appUser)
    },
    async fetchUser() {
      this.user = await api.get('/user/' + this.appUser.id)
    },
    async regUser() {
      await api.post('/user', { user_telegram_id: this.appUser.id })
    },

    async manageUser() {
      if (!this.appUser.id) return
      await this.fetchUser()
      if (!this.user.user_id) {
        await this.regUser()
        await this.fetchUser()
      }
    },
  },
})

// async getBalance(wallet) {
//   const { result } = await $fetch(
//     'https://toncenter.com/api/v2/getAddressBalance?address=' + wallet.account.address,
//   )
//   this.balance = result / 1000000000
// },

// getUserFromApp -> manageUser
