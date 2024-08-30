<template>
  <NavbarView>
    <template #center>
      <div class="font-bold text-neutral-content">Rewards</div>
    </template>
  </NavbarView>

  <div class="flex-1 p-4">
    <div class="text-center">
      <div class="flex h-8 items-baseline justify-center">
        <span class="font-oswald text-2xl font-bold">{{ total }}</span>
        <span v-show="rewards !== null" class="ml-1 text-xs opacity-50">TON</span>
      </div>
      <div class="mb-4 mt-2 text-xs">Total won</div>

      <div class="h-10">
        <button v-show="tonConnectUI" class="h-10" id="connect"></button>
      </div>
    </div>

    <div class="font-oswald mb-2 mt-4 flex items-baseline">
      <IconsTrophy class="mr-1 h-3 w-3 text-neutral-content" />
      Rewards history
      <button @click="fetch" class="font-roboto btn btn-neutral btn-xs ml-1 font-normal">reload</button>
    </div>

    <div class="-ml-2 -mr-2 overflow-x-auto">
      <Loader :data="rewards">
        <template #empty>
          <div class="text-center opacity-50">No rewards yet</div>
        </template>

        <table class="table table-xs">
          <thead>
            <tr>
              <th>Date</th>
              <th class="text-center">Place</th>
              <th class="text-center">Amount</th>
              <th class="text-center">Reward</th>
              <th class="text-center">back status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, i) in rewards" :key="i">
              <td>{{ dates[i] }}</td>
              <td class="text-center">{{ r.place }}</td>
              <td class="text-center">
                {{ r.reward }}
                <span class="text-xs opacity-50">TON</span>
              </td>
              <td class="text-center">
                <button
                  v-if="r.status == 'new'"
                  @click="noWallet ? $refs.modal.showModal() : cash($event, r.id, i)"
                  class="btn btn-neutral btn-sm w-20"
                >
                  Recieve
                </button>
                <div v-else class="inline-block w-20 leading-8 text-white text-opacity-50">Sended</div>
              </td>
              <td>{{ r.status }}</td>
            </tr>
          </tbody>
        </table>
      </Loader>
    </div>
  </div>

  <dialog class="modal" ref="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">One more step!</h3>
      <p class="py-4">To recieve your rewards, please connect your TON wallet.</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script>
import { TonConnectUI } from '@tonconnect/ui'
import { mapState, mapActions, mapWritableState } from 'pinia'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      rewards: null,
    }
  },

  computed: {
    ...mapState(useWalletStore, ['wallet']),
    ...mapWritableState(useWalletStore, ['tonConnectUI']),

    dates() {
      return this.rewards?.map((c) => dayjs(c.data).format('DD.MM.YYYY'))
    },
    noWallet() {
      return this.rewards && !this.wallet.address
    },
    total() {
      return this.rewards?.reduce((summ, { reward }) => summ + reward, 0)
    },
  },

  methods: {
    ...mapActions(useWalletStore, ['onLogin', 'onLogout', 'getRewards', 'cashReward']),

    async logout() {
      await this.tonConnectUI.disconnect()
    },
    initTonConnect() {
      this.tonConnectUI = new TonConnectUI({
        manifestUrl: 'https://rvvr.github.io/tonconnect-manifest.json',
      })
    },
    renderTonConnect() {
      this.tonConnectUI.uiOptions = {
        twaReturnUrl: 'https://t.me/bullflagbot',
        buttonRootId: 'connect',
      }
    },

    async cash(e, reward_id, i) {
      e.target.disabled = true
      await this.cashReward(reward_id)

      this.rewards[i].status = 'withdrawn'
    },

    async fetch() {
      this.rewards = await this.getRewards()
    },
  },

  async mounted() {
    if (!this.tonConnectUI) this.initTonConnect()
    this.renderTonConnect()
    this.tonConnectUI.connectionRestored.then(async (restored) => {
      if (restored && !this.wallet.address) await this.onLogin(this.tonConnectUI.wallet)
    })
    this.tonConnectUI.onStatusChange(async (wallet) =>
      wallet ? await this.onLogin(this.tonConnectUI.wallet) : this.onLogout(),
    )

    await this.fetch()
  },
  beforeUnmount() {
    if (this.tonConnectUI) this.tonConnectUI.uiOptions = { buttonRootId: null }
  },
}
</script>
