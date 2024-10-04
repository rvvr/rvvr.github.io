<template>
  <NavbarView class="!bg-[#09090b]">
    <template #center>
      <div class="grid grid-cols-[1fr_1fr_1fr] justify-items-center gap-2">
        <div class="font-oswald flex items-center text-sm">
          <template v-if="endTime">
            <IconsTime class="mr-1 h-3.5 w-3.5 pt-px text-neutral-content" />
            <span class="w-8">
              <Countdown :date="endTime" />
            </span>
          </template>
        </div>
        <NuxtLink :to="`/games/rooms/rocket-${$route.params.room}/rating`">
          <template v-if="userRating">
            <NavbarBalance :balance="userRating.balance" :fake="true" />
          </template>
        </NuxtLink>

        <NuxtLink
          :to="`/games/rooms/rocket-${$route.params.room}/rating`"
          class="font-oswald flex items-center text-sm"
        >
          <template v-if="userRating">
            <IconsTrophy class="mx-1 h-3 w-3 text-neutral-content" />
            {{ userRating.position }}/{{ rating.length }}
          </template>
        </NuxtLink>
      </div>
    </template>
  </NavbarView>

  <div class="relative flex flex-1 bg-[#09090b]">
    <template v-if="running">
      <RocketGame @end="end" class="flex-1" ref="game" />
      <RocketMultiplier ref="multiplier" />
    </template>

    <RocketWait v-else :counter="counter" />
  </div>

  <RocketBet v-if="userRating" />

  <RocketRoomClosed />
</template>

<script>
import { mapState, mapActions } from 'pinia'
import rocket from '~/mixins/rocket'

export default {
  mixins: [rocket],

  created() {
    this.setRoom(this.$route.params.room)
  },

  mounted() {
    RocketSocket.start()
  },

  computed: {
    ...mapState(useRocketStore, ['userRating', 'rating', 'endTime', 'ended']),
  },

  methods: {
    ...mapActions(useRocketStore, ['fetchRating', 'setRoom']),

    async prepare() {
      await Promise.all([this.counterTick(), this.fetchRate(), this.fetchRating()])
      if (this.ended) {
        document.getElementById('rocketRoomEnded').showModal()
      } else {
        this.run()
      }
    },
  },
}
</script>
