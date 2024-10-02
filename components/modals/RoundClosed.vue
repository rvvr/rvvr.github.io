<template>
  <dialog @cancel.prevent class="modal" ref="modalsRoundClosed">
    <div class="modal-box pt-0">
      <div class="mb-6 text-center">
        <IconsMultiGreenArrow v-if="isUp" class="inline-block h-20 w-20" />
        <IconsMultiRedArrow v-else class="inline-block h-20 w-20 rotate-180" />

        <div class="font-oswald text-2xl font-bold">
          <span v-if="isUp">Up Wins! </span>
          <span v-else>Down Wins! </span>
          <span :class="[isUp ? 'text-lime-500' : 'text-red-500']">
            {{ usdFormat(-(+startRate - +endRate)) }}
          </span>
        </div>

        <div class="mt-2 text-xs text-white text-opacity-80">
          <span>From </span>
          {{ usdFormat(startRate) }}
          <span> to </span>
          {{ usdFormat(endRate) }}
        </div>
      </div>

      <template v-if="roomRating.length">
        <h3 class="font-oswald text-lg">
          <template v-if="!roundsLeft">
            Round <span class="">{{ `${current_round_number}`.slice(-2) }}</span> of
            {{ `${max_round_number}`.slice(-2) }} finished. Rounds left: {{ roundsLeft }}
          </template>
          <div v-else class="flex justify-between align-bottom">
            <span>Room finished!</span>
            <NuxtLink
              :to="`/games/rooms/${$route.params.room}/history`"
              class="font-roboto inline pt-1.5 text-sm text-info"
            >
              View history
            </NuxtLink>
          </div>
        </h3>
        <div class="grid grid-cols-[1fr_auto] grid-rows-3 gap-x-2 py-2 text-white text-opacity-80">
          <div>Position in the tournament</div>
          <div class="font-bold text-neutral-content">
            {{ userRating.position }}
          </div>
          <template v-if="winSize">
            <div>You {{ winSize > 0 ? 'won' : 'lost' }} in Round</div>
            <div
              :class="[winSize > 0 ? 'text-lime-500' : 'text-red-500']"
              class="font-bold text-neutral-content"
            >
              {{ Math.abs(winSize) }}
            </div>
          </template>
          <div>Balance after Round</div>
          <div class="font-bold text-neutral-content">{{ userRating.balance }}</div>
        </div>
        <div class="font-oswald flex py-2 text-lg">
          <div class="flex-1 pr-2">Leaders</div>
          <div>
            <IconsTrophy class="inline h-3 w-3 align-baseline text-neutral-content" /> 3
            <span class="text-xs">USDT</span>
          </div>
          <div class="mx-1.5 opacity-50">/</div>
          <div>
            <IconsTrophy class="inline h-3 w-3 align-baseline text-slate-400" /> 2
            <span class="text-xs">USDT</span>
          </div>
          <div class="mx-1.5 opacity-50">/</div>
          <div>
            <IconsTrophy class="inline h-3 w-3 align-baseline text-orange-500" /> 1
            <span class="text-xs">USDT</span>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-sm text-white text-opacity-80">
            <tbody>
              <tr v-for="(row, i) in roomRating.slice(0, 3)" :key="i">
                <td class="">{{ row.position }}</td>
                <td>
                  <div class="flex items-center">
                    <img
                      :src="
                        row.avatar_url
                          ? useRuntimeConfig().public.baseURL + row.avatar_url
                          : `https://robohash.org/${i}.png?set=set3`
                      "
                      class="mr-2 h-8 w-8 rounded-full"
                    /><span class="inline-block w-32 overflow-hidden overflow-ellipsis">{{
                      row.username
                    }}</span>
                  </div>
                </td>
                <td
                  :class="[row.balance ? 'text-lime-500' : 'uppercase text-red-500']"
                  class="text-center font-bold"
                >
                  {{ row.balance ? row.balance : 'out' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <div
        v-else-if="winSize"
        class="grid grid-cols-[1fr_auto] grid-rows-2 gap-x-2 pb-6 text-white text-opacity-80"
      >
        <div>You {{ winSize > 0 ? 'won' : 'lost' }} in Round</div>
        <div :class="[winSize > 0 ? 'text-lime-500' : 'text-red-500']" class="font-bold text-neutral-content">
          {{ Math.abs(winSize) }}
        </div>
        <div>Balance after Round</div>
        <div class="font-bold text-neutral-content">{{ user.balance }}</div>
      </div>

      <div class="mt-2 text-center">
        <button v-if="roundsLeft" @click="closeModal" class="btn btn-neutral">Close</button>
        <button v-else @click="navigateTo('/games/rooms')" class="btn btn-neutral">Leave</button>
      </div>
    </div>
  </dialog>
</template>

<script>
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useRoomStore, [
      'rewards',
      'startRate',
      'endRate',
      'winner_side',
      'round_status',
      'userRating',
      'roomRating',
      'current_round_number',
      'max_round_number',
    ]),
    ...mapState(useUserStore, ['user']),

    roundsLeft() {
      const left = this.max_round_number - this.current_round_number
      return left > 99 ? '99+' : left
    },

    isUp() {
      return this.winner_side === 'up'
    },

    winSize() {
      const rewardInfo = this.rewards?.[this.user.user_id]
      return rewardInfo ? rewardInfo.win_size : false
    },
  },

  methods: {
    closeModal() {
      this.$refs.modalsRoundClosed.close()
    },
  },

  watch: {
    round_status(round_status, old) {
      if (round_status === 'closed') {
        if (this.current_round_number === this.max_round_number) {
          GameSocket.stop()
        }
        setTimeout(() => {
          if (this.$refs.modalsRoundClosed) this.$refs.modalsRoundClosed.showModal()
        }, 1000)
      } else this.closeModal()
    },
  },
}
</script>

<style scoped>
.table :where(thead tr, tbody tr:not(:last-child), tbody tr:first-child:last-child) {
  border-bottom-width: 0 !important;
}
</style>
