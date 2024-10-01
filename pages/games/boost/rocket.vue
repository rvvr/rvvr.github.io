<template>
  <NavbarView class="!bg-[#09090b]">
    <template #center>
      <NuxtLink to="/home">
        <NavbarBalance :balance="balance" />
      </NuxtLink>
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
    this.loop = new Loop(() => this.$refs.game?.run(), 20)
    await this.prepare()
  },

  computed: {
    ...mapState(useRocketStore, ['balance']),
  },

  methods: {
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
