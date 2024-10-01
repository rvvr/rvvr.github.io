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
      <RocketGame @end="end" class="flex-1" ref="game" />
      <RocketMultiplier ref="multiplier" />
    </template>

    <RocketWait v-else :counter="counter" />
  </div>

  <RocketBet />

  <!-- <div
    v-if="false"
    class="z-1 absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center px-4"
  >
    <h3 class="font-oswald text-center text-lg">Tournament finished!</h3>
    <div class="grid w-full grid-cols-[1fr_auto] gap-x-2 py-2 text-white text-opacity-80">
      <div>Position in the tournament</div>
      <div class="font-bold text-neutral-content">{{ userRating.position }}</div>
    </div>
    <div class="font-oswald flex w-full py-2 text-lg">
      <div class="flex-1 pr-2">Leaders</div>
      <div>
        <IconsTrophy class="inline h-3 w-3 align-baseline text-neutral-content" /> 3
        <span class="text-xs">USDT</span>
      </div>
      <div class="mx-1.5 opacity-50">/</div>
      <div>
        <IconsTrophy class="inline h-3 w-3 align-baseline text-slate-400" /> 2
        <span class="text-xs">USDT</span>
      </div>
      <div class="mx-1.5 opacity-50">/</div>
      <div>
        <IconsTrophy class="inline h-3 w-3 align-baseline text-orange-500" /> 1
        <span class="text-xs">USDT</span>
      </div>
    </div>
    <div class="w-full overflow-x-auto">
      <table class="table table-sm text-white text-opacity-80">
        <tbody>
          <tr v-for="(row, i) in rating.slice(0, 3)" :key="i">
            <td class="">{{ row.position }}</td>
            <td>
              <div class="flex items-center">
                <img
                  :src="
                    row.avatar_url
                      ? useRuntimeConfig().public.baseURL + row.avatar_url
                      : `https://robohash.org/${i}.png?set=set3`
                  "
                  class="mr-2 h-8 w-8 rounded-full"
                /><span class="inline-block w-32 overflow-hidden overflow-ellipsis">{{ row.username }}</span>
              </div>
            </td>
            <td
              :class="[row.balance ? 'text-lime-500' : 'uppercase text-red-500']"
              class="text-center font-bold"
            >
              {{ row.balance ? row.balance : 'out' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-2 text-center">
      <button @click="navigateTo('/games/rooms/?game_type=rocket')" class="btn btn-neutral">Leave</button>
    </div>
  </div>
  <button @click="stopTournament" class="btn btn-accent">stop</button> -->
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
    this.fetchRating()

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
      await Promise.all([this.counterTick(), this.fetchRate()])
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
  },

  beforeUnmount() {
    this.loop?.stop()
    useRocketStore().$reset()
  },
}
</script>
