<template>
  <div class="flex min-h-dvh flex-col justify-between">
    <div class="navbar bg-base-200">
      <div class="flex-1">
        <a class="btn btn-ghost px-2 text-xl">Bullfights</a>
      </div>
      <div class="flex-none gap-2">
        <div>
          <button class="h-10" id="connect" v-show="isGuest"></button>
        </div>

        <div class="dropdown dropdown-end">
          <div class="avatar btn btn-circle btn-ghost" role="button" tabindex="0">
            <div v-if="avatar" class="h-10 w-10 cursor-pointer overflow-hidden rounded-full bg-black">
              <img :src="avatar" class="rounded-full" alt="Tailwind CSS Navbar component" />
            </div>
          </div>
          <div
            v-if="isGuest === false"
            class="menu dropdown-content menu-sm z-[1] mt-3 w-64 rounded-box bg-base-200 p-2 shadow"
            tabindex="0"
          >
            <ul>
              <div v-if="first_name" class="my-1 px-3">{{ first_name }}</div>
              <div v-if="balance !== null" class="my-1 flex justify-between px-3">
                <div>Balance</div>
                <div>
                  <b>{{ balance }}</b> TON
                </div>
              </div>
              <li><a>Profile</a></li>
              <li><a>Settings</a></li>
              <li><a class="link-hover link">About us</a></li>
              <li><a class="link-hover link">Contact</a></li>
              <li><a class="link-hover link">Jobs</a></li>
              <li><a class="link-hover link">Press kit</a></li>
              <li><a @click="exit">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="font-oswald">
      <div class="flex items-center justify-between p-4">
        <div class="text-lime-400">
          <div class="text-1xl font-bold uppercase opacity-75">Up pool payout</div>
          <div class="font-black">
            <span class="text-2xl">17.7</span>
            <span class="text-1xl pl-1">(0.0)</span>
          </div>
          <div class="text-lg font-medium">177%</div>
        </div>

        <Timer></Timer>

        <div class="text-right text-red-500">
          <div class="text-1xl font-bold uppercase opacity-75">Up pool payout</div>
          <div class="font-black">
            <span class="text-2xl">17.7</span>
            <span class="text-1xl pl-1">(0.0)</span>
          </div>
          <div class="text-lg font-medium">177%</div>
        </div>
      </div>
    </div>

    <Graph></Graph>
    <div class="grid grid-cols-2 gap-4 p-4">
      <button
        class="btn h-16 border-2 border-lime-700 bg-lime-500 text-xl font-bold uppercase text-white shadow-md shadow-lime-300"
      >
        Up
      </button>
      <button
        class="btn h-16 border-2 border-red-700 bg-red-500 text-xl font-bold uppercase text-white shadow-md shadow-red-300"
      >
        Down
      </button>
    </div>
    <div class="grid grid-cols-7 gap-2 p-4 pt-0">
      <button
        v-for="item in [5, 10, 15, 25, 50, 100, 200]"
        :class="[item === 5 ? 'text-white' : 'btn-outline']"
        :key="item"
        class="font-oswald btn btn-success border-2"
      >
        {{ item }}
      </button>
    </div>

    <!-- <footer class="footer footer-center rounded bg-base-200 p-10 text-base-content">
      <nav class="grid grid-flow-col gap-4">
        <a class="link-hover link">About us</a>
        <a class="link-hover link">Contact</a>
        <a class="link-hover link">Jobs</a>
        <a class="link-hover link">Press kit</a>
      </nav>
      <aside>
        <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
      </aside>
    </footer> -->
  </div>
</template>

<script>
import { TonConnectUI } from '@tonconnect/ui'
import { setInterval } from './node_modules/nuxt/dist/app/compat/interval'

export default {
  // setup() {
  //   useHead({
  //     htmlAttrs: {
  //       'data-theme': 'acid',
  //       // "data-theme": "synthwave"
  //     },
  //   })
  // },
  data() {
    return {
      first_name: null,
      id: null,
      balance: null,
      ip: null,
      avatar: null,
      isGuest: null,
      tonConnectUI: null,
    }
  },

  methods: {
    async exit() {
      this.isGuest = null
      this.balance = null
      await this.tonConnectUI.disconnect()
      location.reload()
    },
    getAvatar() {
      this.avatar = this.ip
        ? `https://robohash.org/${this.ip}.png?set=set3`
        : `https://api.crashgame247.io/users/profile-picture?id=${this.id}`
    },
    async getIp() {
      let res = await fetch('https://checkip.amazonaws.com/')
      this.ip = await res.text()
    },
    getUser() {
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
  },
  async mounted() {
    this.getUser()
    if (!this.id) await this.getIp()
    this.getAvatar()

    this.tonConnectUI = new TonConnectUI({
      manifestUrl: 'https://rvvr.github.io/tonconnect-manifest.json',
      buttonRootId: 'connect',
    })
    this.tonConnectUI.uiOptions = {
      twaReturnUrl: 'https://t.me/bullfights_bot',
    }

    const restored = await this.tonConnectUI.connectionRestored
    this.isGuest = !restored
    if (restored) {
      this.isGuest = false
      await this.getBalance(this.tonConnectUI.wallet)
    } else {
      this.isGuest = true
      await this.tonConnectUI.openModal()
    }

    const unsubscribe = this.tonConnectUI.onStatusChange(async (wallet) => {
      if (wallet) {
        this.isGuest = false
        await this.getBalance(wallet)
      } else {
        this.balance = null
      }
    })
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Oswald:wght@200..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
}

.font-oswald {
  font-family: 'Oswald', sans-serif;
  font-optical-sizing: auto;
}
</style>
