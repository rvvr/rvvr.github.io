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
  }),

  actions: {
    getUserFromApp() {
      if (isDev()) {
        this.appUser = {
          id: 1524648,
          username: 'rvvvr',
          first_name: 'RVR',
        }
      } else {
        this.appUser = { ...window.Telegram?.WebApp.initDataUnsafe.user }
      }
    },

    updateUser(data) {
      this.user = { ...this.user, ...data }
    },

    async fetchUser() {
      const user = await api.get('/user/' + this.appUser.id)
      this.updateUser(user)
    },

    async auth() {
      let data
      if (isDev()) {
        data =
          'query_id=AAGoQxcAAAAAAKhDFwB0oiaK&user=%7B%22id%22%3A1524648%2C%22first_name%22%3A%22%F0%9D%99%8D%F0%9D%99%91%F0%9D%99%8D%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22rvvvr%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1721635535&hash=be56525b0685c9683a959c42d1958526f38ff89aa90f1720eda80df0cdb1c7e5'
      } else {
        data = window.Telegram?.WebApp.initData
      }
      this.user = await api.post('/auth/signup', { data })
    },
  },
})
