<template>
  <div class="navbar grid grid-cols-[48px_auto_48px] justify-items-center gap-2 bg-base-200">
    <NuxtLink class="flex w-12 justify-center" to="/">
      <img class="h-10 w-10" alt="" src="/favicon.png" />
    </NuxtLink>

    <template v-if="isIndex">
      <!-- wallet -->
      <NuxtLink v-if="isLogged" to="/wallet/deposit/">
        <div class="btn btn-neutral btn-lg -mt-8 bg-info-content pt-4">
          Balance
          <IconsWallet class="h-4 w-4 text-neutral-content" />
          <span class="font-oswald pb-1 text-xl font-bold leading-none text-lime-500">{{
            user.balance
          }}</span>
          <!-- <IconsTether class="-ml-1 block h-4 w-4 text-neutral-400" /> -->
        </div>
      </NuxtLink>

      <!-- wallet connect -->
      <div v-else v-show="!isLogged" class="flex justify-center">
        <span v-show="id" class="loading loading-dots loading-md"></span>
      </div>

      <!-- profile -->
      <div class="flex-none justify-end gap-2">
        <div class="dropdown dropdown-end h-12">
          <div class="avatar btn btn-circle btn-ghost" role="button" tabindex="0">
            <div class="h-10 w-10 cursor-pointer overflow-hidden rounded-full bg-black">
              <img v-if="avatar" :src="avatar" class="rounded-full" alt="" />
            </div>
          </div>
          <!-- <div
          v-if="isLogged"
          class="menu dropdown-content menu-sm z-[1] mt-3 w-64 rounded-box bg-base-200 p-2 shadow"
          tabindex="0"
        >
          <ul>
            <div v-if="first_name" class="my-1 px-3">{{ first_name }}</div>
            <li>
              <NuxtLink to="/wallet/deposit/">Wallet</NuxtLink>
            </li>
            <li><a>About us</a></li>
            <li><a @click="logout">Disconnect wallet</a></li>
          </ul>
        </div> -->
        </div>
      </div>
    </template>

    <div v-else></div>

    <!-- close icon -->
    <NuxtLink v-show="!isIndex" class="flex-none justify-end" to="/">
      <button class="btn btn-circle h-10 min-h-10 w-10 bg-base-300">
        <IconsCross class=""></IconsCross>
      </button>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      first_name: null,
      id: null,
      avatar: null,
      user: null,
    }
  },

  computed: {
    isIndex() {
      return this.$route.name === 'index'
    },
    isLogged() {
      return !!this.user?.user_id
    },
  },

  methods: {
    async setAvatar() {
      if (this.id) {
        this.avatar = `https://api.crashgame247.io/users/profile-picture?id=${this.id}`
      } else {
        let ip = await $fetch('https://checkip.amazonaws.com/')
        this.avatar = `https://robohash.org/${ip}.png?set=set3`
      }
    },
    getUserFromApp() {
      const user = window.Telegram.WebApp.initDataUnsafe.user
      if (user) {
        this.first_name = user.first_name
        this.id = user.id
      }
    },
    async getBalance(wallet) {
      const { result } = await $fetch(
        'https://toncenter.com/api/v2/getAddressBalance?address=' + wallet.account.address,
      )
      this.balance = result / 1000000000
    },

    async manageUser() {
      if (!this.id) return
      await this.fetchUser()
      if (!this.user.user_id) {
        await this.regUser()
        await this.fetchUser()
      }
    },
    async fetchUser() {
      this.user = await api.get('/user/' + this.id)
    },
    async regUser() {
      await api.post('/user', { user_telegram_id: this.id })
    },
  },
  async mounted() {
    this.getUserFromApp()
    await Promise.allSettled([this.setAvatar(), this.manageUser()])
  },
}
</script>
