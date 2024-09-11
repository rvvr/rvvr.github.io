export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      user_id: null,
      user_telegram_id: null,
      username: null,
      balance: null,
      avatar_url: null,
      wallet_address: null,
    },
    appUser: {
      first_name: '',
      id: null,
      username: '',
    },
    friends: [],
  }),

  actions: {
    getUserFromApp() {
      this.appUser = isDev()
        ? { id: useRuntimeConfig().public.devId }
        : { ...window.Telegram?.WebApp.initDataUnsafe.user }
    },

    updateUser(data) {
      this.user = { ...this.user, ...data }
    },

    async fetchUser() {
      const user = await api.get('/user/' + this.appUser.id)
      this.updateUser(user)
    },

    async auth() {
      const data = isDev() ? useRuntimeConfig().public.initData : window.Telegram?.WebApp.initData
      this.user = await api.post('/auth/signup', { data })
    },

    async fetchFriends() {
      this.friends = await api.get('/friends/')
    },
  },
})
