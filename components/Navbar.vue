<template>
  <div class="navbar grid grid-cols-3 gap-2 bg-base-200">
    <div>
      <a class="btn btn-ghost min-w-0 px-2 text-xl">Bullfights</a>
    </div>
    <div class="flex justify-center">
      <div class="btn btn-neutral -mt-8 flex items-center justify-center bg-info-content pt-2">
        <IconsWallet class="h-4 w-4 text-neutral-content" />
        <span class="font-oswald pb-1 text-xl font-bold leading-none text-lime-500">19.92</span
        ><IconsTether class="-ml-1 block h-4 w-4 text-neutral-400" />
      </div>
    </div>
    <div class="flex-none justify-end gap-2">
      <div>
        <button class="h-10" id="connect" v-show="isGuest"></button>
      </div>

      <div class="dropdown dropdown-end">
        <div v-if="isGuest === false" class="avatar btn btn-circle btn-ghost" role="button" tabindex="0">
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

            <div class="my-1 flex items-center justify-between px-3">
              <div>Profile</div>
              <div>
                <button @click="exit">
                  <IconsExit />
                </button>
              </div>
            </div>

            <li><a>Settings</a></li>
            <li><a class="link-hover link">About us</a></li>
            <li><a class="link-hover link">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TonConnectUI } from '@tonconnect/ui'

export default {
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
