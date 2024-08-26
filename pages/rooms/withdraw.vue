<template>
  <NavbarView>
    <template #center>
      <div class="font-bold text-neutral-content">Rewards</div>
    </template>
  </NavbarView>

  <div class="flex-1 p-4">
    <div class="text-center">
      <span>Total</span>
      <div class="mb-4 flex items-baseline justify-center">
        <span class="text-2xl font-bold">9999</span>
        <span class="ml-1 text-xs opacity-50">TON</span>
      </div>

      <button class="mb-2 h-10" id="connect"></button>
    </div>

    <p v-if="!wallet.address" class="py-2 opacity-50">
      Connect your TON wallet to proceed with the withdrawal.
    </p>

    <div class="mb-2 mt-4 flex items-baseline text-lg font-bold">
      <IconsTrophy class="mr-2 h-4 w-4 text-neutral-content" />
      Winnings
    </div>

    <div class="-ml-2 -mr-2 overflow-x-auto">
      <table class="table table-xs">
        <thead>
          <tr>
            <th>Date</th>
            <th class="text-center">Place</th>
            <th class="text-center">Amount</th>
            <th class="text-center">Reward</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>13.02.2000</td>
            <td class="text-center">1</td>
            <td class="text-center">
              15
              <span class="text-xs opacity-50">TON</span>
            </td>
            <td class="text-center">
              <button class="btn btn-neutral btn-xs">Recieve</button>
            </td>
          </tr>
          <tr>
            <td>13.02.2000</td>
            <td class="text-center">1</td>
            <td class="text-center">
              15
              <span class="text-xs opacity-50">TON</span>
            </td>
            <td class="text-center"><div class="leading-6 text-white text-opacity-50">Sended</div></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { TonConnectUI } from '@tonconnect/ui'
import { mapState, mapActions } from 'pinia'
let tonConnectUI

export default {
  computed: {
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
