<template>
  <div class="flex min-h-screen flex-col justify-between">
    <div class="navbar bg-base-200">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">Bullfights</a>
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
              <li><a @click="exit">exit</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="hero flex-1">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello there</h1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.
            In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
      </div>
    </div>

    <footer class="footer footer-center rounded bg-base-200 p-10 text-base-content">
      <nav class="grid grid-flow-col gap-4">
        <a class="link-hover link">About us</a>
        <a class="link-hover link">Contact</a>
        <a class="link-hover link">Jobs</a>
        <a class="link-hover link">Press kit</a>
      </nav>
      <aside>
        <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
      </aside>
    </footer>
  </div>
</template>

<script>
import { TonConnectUI } from '@tonconnect/ui'

export default {
  setup() {
    useHead({
      htmlAttrs: {
        'data-theme': 'luxury',
        // "data-theme": "synthwave"
      },
    })
  },
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
      console.log('🚀 ~ getBalance ~ wallet:', wallet)
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
