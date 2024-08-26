<template>
  <NavbarView>
    <template #center>
      <div class="font-bold text-neutral-content">Withdraw</div>
    </template>
  </NavbarView>

  <div class="flex-1 p-4">
    <div class="text-center">
      <div class="mb-4 flex items-baseline justify-center">
        <span><IconsWallet class="mr-2 h-3 w-3 opacity-50" /></span>
        <span class="text-2xl font-bold">9999</span>
        <span class="ml-1 text-xs opacity-50">TON</span>
      </div>

      <button class="mb-2 h-10" id="connect"></button>
    </div>

    <div v-if="wallet.address">
      <p class="py-2 opacity-50">
        Direct withdrawal trough blockchain can take up to 10 minutes. Please be patient!
      </p>

      <label class="form-control mt-2 w-full">
        <div class="label">
          <span class="label-text-alt">Withdraw Address</span>
        </div>
        <input
          :value="wallet.address"
          class="input input-bordered w-full"
          placeholder="Enter your withdraw Address"
          type="text"
        />
      </label>

      <label class="form-control mt-2 w-full">
        <div class="label">
          <span class="label-text-alt">Withdraw Amount</span>
          <span class="label-text-alt">Minimum withdrawal: 1</span>
        </div>
        <div class="join border">
          <input class="input join-item input-bordered w-full" type="text" value="0.00" />
          <button class="btn btn-square join-item">25%</button>
          <button class="btn btn-square join-item">50%</button>
          <button class="btn btn-square join-item">100%</button>
        </div>
      </label>

      <div class="btn btn-neutral mt-6 w-full">Withdraw</div>
    </div>

    <p v-else class="py-2 opacity-50">Connect your TON wallet to proceed with the withdrawal.</p>

    <div class="mb-2 mt-8 flex items-baseline text-lg font-bold">
      <IconsTrophy class="mr-2 h-4 w-4 text-neutral-content" />
      Winning history
    </div>

    <div class="-ml-2 -mr-2 overflow-x-auto">
      <table class="table table-xs">
        <thead>
          <tr>
            <th>Date</th>
            <th class="text-center">Place</th>
            <th class="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>13.02.2000</td>
            <td class="text-center">1</td>
            <td class="text-right">
              15
              <span class="text-xs opacity-50">TON</span>
            </td>
          </tr>
          <tr>
            <td>12.02.2000</td>
            <td class="text-center">2</td>
            <td class="text-right">
              10
              <span class="text-xs opacity-50">TON</span>
            </td>
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
