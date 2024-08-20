<template>
  <div class="modal-box p-4">
    <div class="flex justify-center py-2 text-neutral-content">
      <IconsWinner class="h-24" />
    </div>
    <h3 class="font-oswald mb-6 text-center text-2xl font-bold">Room finished!</h3>

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
      <table class="table-sm">
        <tbody>
          <tr
            v-for="(row, i) in roomRating.slice(0, 3)"
            :key="i"
            :class="{ 'bg-base-300 font-bold text-neutral-content': row.user_id === user.user_id }"
          >
            <td class="w-1">{{ row.position }}</td>
            <td>
              <div class="flex items-center">
                <img
                  :src="
                    row.avatar_url
                      ? useRuntimeConfig().public.baseURL + row.avatar_url
                      : `https://robohash.org/${i}.png?set=set3`
                  "
                  class="mr-2 h-8 w-8 rounded-full"
                /><span class="inline-block w-32 overflow-hidden overflow-ellipsis">{{ row.username }}</span>
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
      <form method="dialog">
        <button @click.prevent="navigateTo('/rooms')" class="btn btn-neutral">Leave</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['roomRating', 'user'],
}
</script>
