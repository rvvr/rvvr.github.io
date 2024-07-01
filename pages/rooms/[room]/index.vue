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
          <NavbarBalance :balance="userRating.balance" />

          <button class="btn btn-secondary join-item btn-lg -mt-8 pt-4">
            <IconsTrophy class="h-4 w-4 opacity-80" />
            <span class="font-oswald text-xl font-bold leading-none">{{ userRating.position }}</span>
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
  computed: {
    ...mapState(useRoomStore, ['userRating']),
  },

  methods: {
    ...mapActions(useRoomStore, ['openRoomSocket', 'closeRoomSocket']),
  },

  mounted() {
    this.openRoomSocket(this.$route.params.room)
  },

  unmounted() {
    this.closeRoomSocket()
  },
}
</script>
