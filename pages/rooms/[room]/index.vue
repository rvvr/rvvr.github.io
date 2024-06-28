<template>
  <NavbarView>
    <template #left>
      <NuxtLink to="/rooms/">
        <button class="btn btn-circle h-10 min-h-10 w-10 bg-base-300">
          <IconsBack />
        </button>
      </NuxtLink>
    </template>
    <template #center>
      <div class="join">
        <NuxtLink :to="`/rooms/${$route.params.room}/rating`">
          <NavbarBalance :balance="roomData.balance" />

          <button class="btn btn-secondary join-item btn-lg -mt-8 pt-4">
            <IconsTrophy class="h-4 w-4 opacity-80" />
            <span class="font-oswald text-xl font-bold leading-none">{{ roomData.position }}</span>
          </button>
        </NuxtLink>
      </div>
    </template>
  </NavbarView>

  <Game />
</template>

<script>
import { mapActions, mapState } from 'pinia'

export default {
  data() {
    return {
      roomData: {},
    }
  },

  computed: {
    ...mapState(useUserStore, ['user']),
  },

  methods: {
    ...mapActions(useRoomStore, ['getRoomSocket', 'closeRoomSocket', 'getRoomRating']),
  },

  async mounted() {
    this.getRoomSocket(this.$route.params.room)
    const roomData = await this.getRoomRating(this.$route.params.room)
    this.roomData = roomData.find((c) => c.user_id === this.user.user_id)
  },

  unmounted() {
    this.closeRoomSocket()
  },
}
</script>
