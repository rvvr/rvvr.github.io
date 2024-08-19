<template>
  <div class="p-4">
    <h3 class="text-center text-lg font-bold">
      Round <span class="">{{ roundNumber }}</span> finished
    </h3>

    <div class="grid grid-cols-[1fr_auto] grid-rows-3 gap-x-2 py-2 text-sm text-white text-opacity-80">
      <div>You won/lost in Round</div>
      <div class="font-bold text-neutral-content">99</div>
      <div>Your Balance after Round</div>
      <div class="font-bold text-neutral-content">{{ userRating.balance }}</div>
      <div>Your position in the tournament is</div>
      <div class="font-bold text-neutral-content">
        {{ userRating.position }}
        <span class="font-normal text-white text-opacity-80">/ {{ roomRating.length }}</span>
      </div>
    </div>

    <div class="flex py-2">
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
      <table class="table table-xs">
        <tbody>
          <tr
            v-for="(row, i) in roomRating.slice(0, 3)"
            :key="i"
            :class="{ 'bg-base-300 font-bold text-neutral-content': row.user_id === user.user_id }"
          >
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
                /><span class="inline-block w-48 overflow-hidden overflow-ellipsis">{{ row.username }}</span>
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
  </div>
</template>

<script>
export default {
  props: ['roomRating', 'user', 'roundNumber', 'userRating'],
}
</script>
