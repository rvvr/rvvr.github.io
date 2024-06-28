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
          <NavbarBalance />

          <button class="btn btn-secondary join-item btn-lg -mt-8 pt-4">
            <IconsTrophy class="h-4 w-4 opacity-80" />
            <span class="font-oswald text-xl font-bold leading-none">2/6</span>
          </button>
        </NuxtLink>
      </div>
    </template>
  </NavbarView>

  <Game />
</template>

<script>
import { mapActions } from 'pinia'

export default {
  methods: {
    ...mapActions(useRoomStore, ['getRoomSocket', 'closeRoomSocket']),
  },

  mounted() {
    this.getRoomSocket(this.$route.params.room)
  },

  unmounted() {
    this.closeRoomSocket()
  },
}
</script>
