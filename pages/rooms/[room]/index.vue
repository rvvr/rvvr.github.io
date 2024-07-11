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
    <ModalsRoomClosed :room-rating="roomRating" :user="user" />
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
