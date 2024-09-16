<template>
  <NavbarView class="!bg-[#09090b]">
    <template #center>
      <NuxtLink to="/home">
        <NavbarBalance :balance="user.balance" />
      </NuxtLink>
    </template>
  </NavbarView>

  <div class="flex flex-1 bg-[#09090b]">
    <RocketGame v-if="running" @end="end" class="flex-1" ref="game" />

    <div v-else @click="running = true" class="absolute left-0 top-1/2 w-full px-4 text-center">
      <div class="font-oswald">Waiting for next round</div>
      <progress :value="counter" class="progress progress-error w-1/2" max="100"></progress>
    </div>
  </div>

  <RocketBet />
</template>

<script>
import { mapState } from '~/node_modules/pinia/dist/pinia'

export default {
  computed: {
    ...mapState(useUserStore, ['user']),
  },

  data() {
    return {
      running: true,
      counter: 0,
    }
  },

  methods: {
    run() {
      this.running = true
    },
    end() {
      setTimeout(() => {
        this.running = false
        const int = setInterval(() => {
          this.counter++
          if (this.counter === 100) {
            clearInterval(int)
            this.counter = 0
            this.run()
          }
        }, 50)
      }, 2000)
    },
  },
}
</script>
