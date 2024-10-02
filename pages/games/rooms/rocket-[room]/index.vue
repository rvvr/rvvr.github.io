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
        <NuxtLink v-if="userRating" :to="`/games/rooms/trade-${$route.params.room}/rating`">
          <NavbarBalance :balance="userRating.balance" :fake="true" />
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
      <RocketGame @end="end()" class="flex-1" ref="game" />
      <RocketMultiplier ref="multiplier" />
    </template>

    <RocketWait v-else :counter="counter" />
  </div>

  <RocketBet />

  <RocketRoomClosed />
</template>

<script>
import { mapState, mapActions } from 'pinia'

export default {
  data() {
    return {
      running: false,
      counter: 0,
      loop: null,
    }
  },

  async mounted() {
    this.setRoom(this.$route.params.room)

    this.loop = new Loop(() => this.$refs.game?.run(), 20)
    await this.prepare()
  },

  computed: {
    ...mapState(useRocketStore, ['userRating', 'rating']),

    ...mapState(useRocketStore, ['balance']),
  },

  methods: {
    ...mapActions(useRocketStore, ['fetchRating', 'setRoom']),

    ...mapActions(useRocketStore, ['fetchRate', 'placeBet', 'wipeBet']),

    async prepare() {
      await Promise.all([this.counterTick(), this.fetchRate(), this.fetchRating()])
      this.run()
    },

    run() {
      this.placeBet()
      this.running = true
      this.loop.start()
    },

    async end() {
      this.wipeBet()
      this.loop.stop()
      await sleep(2000)
      this.running = false
      await this.prepare()
    },

    async counterTick() {
      while (this.counter < 100) {
        this.counter++
        await sleep(25)
      }
      this.counter = 0
    },

    async stopTournament() {
      this.end = async () => {
        this.loop.stop()
        await Promise.all([sleep(2000), this.fetchRating()])
        document.getElementById('rocketRoomEnded').showModal()
      }
    },
  },

  beforeUnmount() {
    this.loop?.stop()
    useRocketStore().$reset()
  },
}
</script>
