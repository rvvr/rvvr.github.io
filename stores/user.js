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
    token: null,
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

    async getToken() {
      const { token } = await api.post('/auth/signup', { data: window.Telegram?.WebApp.initData })
      this.token = token
    },

    async setAvatar() {
      if (this.user.avatar_url) {
        this.avatar = useRuntimeConfig().public.baseURL + this.user.avatar_url
      } else {
        let ip = await $fetch('https://checkip.amazonaws.com/')
        this.avatar = `https://robohash.org/${ip}.png?set=set3`
      }
    },
  },
})
