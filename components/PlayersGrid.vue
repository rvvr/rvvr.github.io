<template>
  <div :class="animation" class="avatar-group -space-x-3 pt-2 rtl:space-x-reverse">
    <div
      v-for="(player, i) in players[side].slice(0, 5)"
      :key="i"
      class="avatar h-10 w-10 border-base-100 bg-base-300"
    >
      <div class="h-8 w-8">
        <img
          :src="
            player.avatar_url
              ? useRuntimeConfig().public.baseURL + player.avatar_url
              : `https://robohash.org/${i}.png?set=set3`
          "
        />
      </div>
    </div>

    <div v-if="players[side].slice(5).length" :key="i" class="avatar placeholder h-10 w-10">
      <div class="h-8 w-8 bg-neutral text-neutral-content">
        <span>+{{ players[side].slice(5).length }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'

export default {
  props: ['side'],
  data() {
    return {
      animation: '',
    }
  },
  computed: {
    ...mapState(useRoomStore, ['players']),
  },
  methods: {
    manageWinner(side) {
      this.animation = side === this.side ? 'animate-bounce' : ''
      setTimeout(() => (this.animation = ''), 5000)
    },
  },
  mounted() {
    this.$bus.on('winner', this.manageWinner)
  },
  unmounted() {
    this.$bus.off('winner', this.manageWinner)
  },
}
</script>
