<template>
  <NavbarView>
    <template #left>
      <div class="font-oswald block">
        <div class="text-xs uppercase opacity-80">Roll</div>
        <div class="text-sm">
          <span class="font-bold text-neutral-content">19</span> <span class="opacity-80">/</span> 100
        </div>
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
    timer.start()
    this.openRoomSocket(this.$route.params.room)
  },
  unmounted() {
    timer.stop()
    this.closeRoomSocket()
  },
}
</script>
