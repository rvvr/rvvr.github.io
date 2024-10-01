<template>
  <NavbarView class="!bg-[#09090b]">
    <template #center>
      <div class="grid grid-cols-[1fr_1fr_1fr] justify-items-center gap-2">
        <div class="font-oswald flex items-center text-sm">
          <!-- <template v-if="current_round_number">
            <IconsCycle class="mr-1 h-3.5 w-3.5 pt-px text-neutral-content" />
            {{ `${this.current_round_number}`.slice(-2) }}/{{ `${max_round_number}`.slice(-2) }}
          </template> -->
        </div>

        <NuxtLink v-show="userRating.position" :to="`/games/rooms/trade-${$route.params.room}/rating`">
          <NavbarBalance :balance="userRating.balance" :fake="true" />
        </NuxtLink>

        <NuxtLink
          :to="`/games/rooms/rocket-${$route.params.room}/rating`"
          class="font-oswald flex items-center text-sm"
        >
          <template v-if="userRating.position">
            <IconsTrophy class="mx-1 h-3 w-3 text-neutral-content" />
            {{ userRating.position }}/{{ rating.length }}
          </template>
        </NuxtLink>
      </div>
    </template>
  </NavbarView>

  <RocketWrap />
</template>

<script>
import { mapWritableState, mapState, mapActions } from '~/node_modules/pinia/dist/pinia'

export default {
  computed: {
    ...mapWritableState(useRocketStore, ['room']),
    ...mapState(useRocketStore, ['userRating', 'rating']),
  },

  methods: {
    ...mapActions(useRocketStore, ['fetchRating']),
  },

  mounted() {
    this.room = this.$route.params.room
    RocketSocket.start()
    this.fetchRating()
  },

  beforeUnmount() {
    RocketSocket.stop()
  },
}
</script>
