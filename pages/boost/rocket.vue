<template>
  <NavbarView class="!bg-[#09090b]">
    <template #center>
      <NuxtLink to="/home">
        <NavbarBalance :balance="user.balance" />
      </NuxtLink>
    </template>
  </NavbarView>

  <div class="relative flex flex-1 bg-[#09090b]">
    <RocketGame v-if="running" @end="end" class="flex-1" ref="game" />

    <Transition>
      <div
        v-if="!running"
        class="z-1 absolute left-0 top-0 flex h-full w-full items-center justify-center px-4"
      >
        <div>
          <img class="mx-auto h-12 w-12 animate-bounce" alt="" src="/rocket-svgrepo-com.png" />
          <div class="font-oswald">Waiting for next round</div>
          <progress :value="counter" class="progress progress-error" max="100"></progress>
        </div>
      </div>
    </Transition>

    <div class="absolute bottom-0 left-0">
      <RocketMultiplier v-if="running" ref="multiplier" />
    </div>
  </div>

  <RocketBet :blocked="running" />
</template>

<script>
import { mapState, mapWritableState } from '~/node_modules/pinia/dist/pinia'

export default {
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapWritableState(useRocketStore, ['ds', 'rate']),
  },

  data() {
    return {
      running: false,
      counter: 0,
      loop: null,
    }
  },

  mounted() {
    this.loop = new Loop(() => {
      this.$refs.game?.run()
      this.$refs.multiplier?.run()
    }, 20)
    this.prepare()
  },

  methods: {
    run() {
      this.running = true
      this.loop.start()
    },

    async end() {
      this.loop.stop()
      await sleep(2000)
      this.running = false
      await this.prepare()
    },

    async prepare() {
      this.rate = pad(70000)
      while (this.counter < 100) {
        this.counter++
        await sleep(25)
      }
      this.counter = 0
      this.run()
    },
  },

  beforeUnmount() {
    this.loop?.stop()
  },
}
</script>
