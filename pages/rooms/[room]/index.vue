<template>
  <NavbarView class="!bg-[#09090b]">
    <template #center>
      <div class="grid grid-cols-[1fr_1fr_1fr] justify-items-center gap-2">
        <div class="font-oswald flex items-center text-sm">
          <template v-if="current_round_number">
            <IconsCycle class="mr-1 h-3.5 w-3.5 pt-px text-neutral-content" />
            {{ `${this.current_round_number}`.slice(-2) }}/{{ `${max_round_number}`.slice(-2) }}
          </template>
        </div>

        <NuxtLink :to="`/rooms/${$route.params.room}/rating`">
          <NavbarBalance :balance="userRating.balance" :fake="true" />
        </NuxtLink>

        <NuxtLink :to="`/rooms/${$route.params.room}/rating`" class="font-oswald flex items-center text-sm">
          <template v-if="userRating.position">
            <IconsTrophy class="mx-1 h-3 w-3 text-neutral-content" />
            {{ userRating.position }}/{{ roomRating.length }}
          </template>
        </NuxtLink>
      </div>
    </template>
  </NavbarView>

  <Game />

  <ModalsRoomClosed />
  <ModalsRoundClosed />
</template>

<script>
import { mapState } from 'pinia'
import rooms from '~/mixins/rooms'

export default {
  mixins: [rooms],

  computed: {
    ...mapState(useRoomStore, ['userRating', 'roomRating', 'current_round_number', 'max_round_number']),
  },
}
</script>
