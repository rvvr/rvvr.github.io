<template>
  <div class="flex-1 p-4">
    <div class="text-center">
      <div class="font-oswald mb-2 text-6xl font-bold text-lime-500">{{ user.balance }}</div>
      <div class="mb-4 flex items-center justify-center text-neutral-content">
        <span><IconsWallet class="mr-1 h-4 w-4" /></span>
        <span class="font-bold uppercase">Your Balance</span>
      </div>

      <div class="mb-5">
        <button class="mb-2 h-10" id="connect"></button>
        <div v-if="wallet" class="mb-4 flex items-center justify-center text-neutral-content">
          <img :src="walletIcon" class="mr-1 h-4 w-4" alt="" />
          <span class="font-bold uppercase">Your wallet</span>
        </div>
      </div>
    </div>
    <div class="tabs-boxed tabs mb-5" role="tablist">
      <NuxtLink class="tab" role="tab" to="/wallet/deposit/">
        <IconsArrow class="mr-1 h-4 w-4 rotate-180"></IconsArrow>
        Deposit
      </NuxtLink>
      <NuxtLink class="tab" role="tab" to="/wallet/withdraw/">
        <IconsArrow class="mr-1 h-4 w-4"></IconsArrow>
        Withdraw
      </NuxtLink>
    </div>

    <NuxtPage />
  </div>
</template>

<script>
import { TonConnectUI, CHAIN, toUserFriendlyAddress } from '@tonconnect/ui'
import { mapState } from 'pinia'
let tonConnectUI

export default {
  data() {
    return {
      wallet: null,
      walletIcon: null,
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
  },
  methods: {
    getWalletAddress(wallet) {
      this.wallet = toUserFriendlyAddress(wallet.account.address, wallet.account.chain === CHAIN.TESTNET)
    },
    onLogin(wallet) {
      this.walletIcon = wallet.imageUrl
      this.getWalletAddress(wallet)
    },
    onLogout() {
      this.wallet = null
    },
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
        twaReturnUrl: 'https://t.me/bullfights_bot',
        buttonRootId: 'connect',
      }
    },
  },
  mounted() {
    if (!tonConnectUI) this.initTonConnect()
    this.renderTonConnect()
    tonConnectUI.connectionRestored.then((restored) => {
      if (restored && !this.wallet) this.onLogin(tonConnectUI.wallet)
    })
    tonConnectUI.onStatusChange((wallet) => (wallet ? this.onLogin(tonConnectUI.wallet) : this.onLogout()))
  },
  unmounted() {
    if (tonConnectUI) tonConnectUI.uiOptions = { buttonRootId: null }
  },
}
</script>
