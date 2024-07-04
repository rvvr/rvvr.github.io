<template>
  <NavbarView>
    <template #left>
      <div class="font-oswald block">
        <template v-if="max_round_number">
          <div class="text-xs uppercase opacity-80">Roll</div>
          <div class="text-nowrap text-sm">
            <span class="font-bold text-neutral-content">{{ current_round_number }}</span>
            <span class="opacity-80"> / </span>{{ max_round_number }}
          </div>
        </template>
      </div>
    </template>

    <template #center>
      <NuxtLink :to="`/rooms/${$route.params.room}/rating`">
        <NavbarBalance :balance="userRating.balance">
          <NavbarAvatar class="h-6 w-6" />
        </NavbarBalance>
      </NuxtLink>
    </template>

    <template #right>
      <div class="flex items-center">
        <NuxtLink :to="`/rooms/${$route.params.room}/rating`" class="mx-2 flex items-center">
          <IconsTrophy class="h-4 w-4 text-neutral-content" />
          <span class="font-oswald pl-1 text-xl font-bold">{{ userRating.position }}</span>
        </NuxtLink>
      </div>
    </template>
  </NavbarView>

  <Game />

  <dialog class="modal" ref="modal">
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
  </dialog>
</template>

<script>
import { mapState, mapActions } from 'pinia'

export default {
  data() {
    return {
      wss: null,
    }
  },
  methods: {
    ...mapActions(useRoomStore, ['openRoomSocket', 'manageSocketEvent']),

    closeRoom() {
      this.$refs.modal.showModal()
      timer.stop()
      this.wss.close()
    },
  },
  computed: {
    ...mapState(useRoomStore, ['userRating', 'roomRating', 'current_round_number', 'max_round_number']),
    ...mapState(useUserStore, ['user']),
  },
  mounted() {
    timer.start()
    this.wss = this.openRoomSocket(this.$route.params.room)
    this.wss.onmessage = this.manageSocketEvent

    this.$bus.on('closeRoom', this.closeRoom)
  },
  unmounted() {
    timer.stop()
    this.wss.close()

    this.$bus.off('closeRoom', this.closeRoom)
  },
}
</script>
