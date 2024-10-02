<template>
  <dialog v-if="userRating" @cancel.prevent class="modal" id="rocketRoomEnded">
    <div class="modal-box">
      <h3 class="font-oswald text-center text-lg">Tournament finished!</h3>
      <div class="grid w-full grid-cols-[1fr_auto] gap-x-2 py-2 text-white text-opacity-80">
        <div>Position in the tournament</div>
        <div class="font-bold text-neutral-content">{{ userRating.position }}</div>
      </div>
      <div class="font-oswald flex w-full py-2 text-lg">
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
      <div class="w-full overflow-x-auto">
        <table class="table table-sm text-white text-opacity-80">
          <tbody>
            <tr v-for="(row, i) in rating.slice(0, 3)" :key="i">
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
                  />
                  <span class="inline-block w-32 overflow-hidden overflow-ellipsis">
                    {{ row.username }}
                  </span>
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

      <div class="mt-2 text-center">
        <button @click="navigateTo('/games/rooms/?game_type=rocket')" class="btn btn-neutral">Leave</button>
      </div>
    </div>
  </dialog>
</template>

<script>
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useRocketStore, ['userRating', 'rating']),
  },
}
</script>
