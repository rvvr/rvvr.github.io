<template>
  <NavbarView class="!bg-[#09090b]">
    <template #center>
      <div class="grid grid-cols-[1fr_1fr_1fr] justify-items-center gap-2">
        <div class="font-oswald flex items-center text-sm">
          <template v-if="current_round_number">
            <!-- Rolls -->
            <span class="mr-1">Play</span>
            <IconsCycle class="mr-1 h-3.5 w-3.5 pt-px text-neutral-content" />
            {{ `${current_round_number}`.slice(-2) }}/{{ `${max_round_number}`.slice(-2) }}
          </template>
        </div>

        <NuxtLink :to="`/rooms/${$route.params.room}/rating`">
          <NavbarBalance :balance="userRating.balance" />
        </NuxtLink>

        <div class="font-oswald flex items-center text-sm">
          <template v-if="userRating.position">
            <span class="mr-1">Place</span>
            <IconsTrophy class="mx-1 h-3 w-3 text-neutral-content" />
            {{ userRating.position }}/{{ roomRating.length }}
          </template>
        </div>
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

    roundsLeft() {
      const left = this.max_round_number - this.current_round_number + 1
      return left > 99 ? '99+' : left
    },
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
