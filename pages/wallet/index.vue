<template>
  <NavbarView>
    <template #center>
      <div class="font-bold text-neutral-content">Your wallet</div>
    </template>
  </NavbarView>

  <div class="flex-1 p-4">
    <div class="text-center">
      <!-- <div class="mb-4 flex items-center justify-center text-neutral-content">
        <span><IconsWallet class="mr-1 h-4 w-4" /></span>
        <span class="text-xl font-bold">Your Balance</span>
      </div> -->

      <button class="mb-2 h-10" id="connect"></button>
    </div>
    <div class="tabs tabs-bordered tabs-lg mb-5" role="tablist">
      <NuxtLink class="tab" active-class="tab-active" role="tab" to="/wallet/deposit/">
        <IconsArrow class="mr-1 h-4 w-4 rotate-180"></IconsArrow>
        Deposit
      </NuxtLink>
      <NuxtLink class="tab" active-class="tab-active" role="tab" to="/wallet/withdraw/">
        <IconsArrow class="mr-1 h-4 w-4"></IconsArrow>
        Withdraw
      </NuxtLink>
    </div>

    <NuxtPage />
  </div>
</template>

<script>
import { TonConnectUI } from '@tonconnect/ui'
import { mapState, mapActions } from 'pinia'
let tonConnectUI

export default {
  setup() {
    definePageMeta({
      middleware(to) {
        if (to.matched.length === 1) {
          return navigateTo('/wallet/deposit')
        }
      },
    })
  },

  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useWalletStore, ['wallet']),
  },
  methods: {
    ...mapActions(useWalletStore, ['onLogin', 'onLogout']),

    async logout() {
      await tonConnectUI.disconnect()
    },
    initTonConnect() {
      tonConnectUI = new TonConnectUI({
        manifestUrl: 'https://rvvr.github.io/tonconnect-manifest.json',
      })
    },
    renderTonConnect() {
      tonConnectUI.uiOptions = {
        twaReturnUrl: 'https://t.me/bullflagbot',
        buttonRootId: 'connect',
      }
    },
  },
  mounted() {
    if (!tonConnectUI) this.initTonConnect()
    this.renderTonConnect()
    tonConnectUI.connectionRestored.then((restored) => {
      if (restored && !this.wallet.address) this.onLogin(tonConnectUI.wallet)
    })
    tonConnectUI.onStatusChange((wallet) => (wallet ? this.onLogin(tonConnectUI.wallet) : this.onLogout()))
  },
  beforeUnmount() {
    if (tonConnectUI) tonConnectUI.uiOptions = { buttonRootId: null }
  },
}
</script>
