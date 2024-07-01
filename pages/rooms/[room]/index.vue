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
      <NuxtLink :to="`/rooms/${$route.params.room}/rating`">
        <div class="join grid grid-cols-[110px_110px]">
          <NavbarBalance :balance="userRating.balance" />

          <button class="btn btn-secondary join-item btn-lg -mt-8 pt-4">
            <IconsTrophy class="h-4 w-4 opacity-80" />
            <span class="font-oswald text-xl font-bold leading-none">{{ userRating.position }}</span>
          </button>
        </div>
      </NuxtLink>
    </template>
  </NavbarView>

  <Game />
</template>

<script>
import { mapState, mapActions } from 'pinia'

export default {
  methods: {
    ...mapActions(useRoomStore, ['openRoomSocket', 'closeRoomSocket']),
  },
  computed: {
    ...mapState(useRoomStore, ['userRating']),
  },
  mounted() {
    this.openRoomSocket(this.$route.params.room)
  },
  unmounted() {
    this.closeRoomSocket()
  },
}
</script>
