<template>
  <NavbarView class="!bg-[#09090b]">
    <template #center>
      <NuxtLink to="/home">
        <NavbarBalance :balance="user.balance" />
      </NuxtLink>
    </template>
  </NavbarView>

  <div class="flex flex-1 bg-[#09090b]">
    <Transition>
      <RocketGame v-if="running" @end="end" class="flex-1" ref="game" />
    </Transition>

    <Transition>
      <div v-if="!running" class="absolute left-0 top-1/2 w-full px-4 text-center">
        <div class="font-oswald">Waiting for next round</div>
        <progress :value="counter" class="progress progress-error w-1/2" max="100"></progress>
      </div>
    </Transition>
  </div>

  <RocketBet />
</template>

<script>
import { mapState } from '~/node_modules/pinia/dist/pinia'
import random from 'lodash.random'
import throttle from 'lodash.throttle'

export default {
  computed: {
    ...mapState(useUserStore, ['user']),
  },

  data() {
    return {
      running: true,
      counter: 0,
      loop: null,
    }
  },

  mounted() {
    this.run()
  },
  beforeUnmount() {
    this.loop?.stop()
  },

  methods: {
    run() {
      this.running = true
      this.$nextTick(() => {
        this.$refs.game.start()
        this.loop = new Loop(() => {
          this.$refs.game.run()
        }, 20).start()
      })
    },

    end() {
      this.loop?.stop()
      setTimeout(() => {
        this.running = false
        this.counter = 0
        const int = setInterval(() => {
          this.counter++
          if (this.counter === 100) {
            clearInterval(int)
            this.run()
          }
        }, 50)
      }, 2000)
    },
  },
}
</script>
