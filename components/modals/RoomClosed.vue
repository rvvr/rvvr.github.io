<template>
  <div class="modal-box p-4">
    <div class="mb-4 flex justify-center py-2 text-neutral-content">
      <IconsWinner class="h-24" />
    </div>
    <h3 class="text-center text-lg font-bold">Room finished!</h3>
    <p class="py-2 text-center">Winners are:</p>

    <div class="overflow-x-auto">
      <table class="table">
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
                />

                {{ row.username }}
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

    <div class="modal-action">
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
