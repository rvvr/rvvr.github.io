<template>
  <div :class="animation" class="avatar-group mt-1 h-7 -space-x-3 rtl:space-x-reverse">
    <div
      v-for="(player, i) in players[side].slice(0, 5)"
      :key="i"
      class="avatar h-7 w-7 border-none bg-[#222]"
    >
      <div class="h-7 w-7">
        <img
          :src="
            player.avatar_url
              ? useRuntimeConfig().public.baseURL + player.avatar_url
              : `https://robohash.org/${i}.png?set=set3`
          "
          class="h-7 w-7 bg-black"
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
  // methods: {
  //   manageWinner(side) {
  //     this.animation = side === this.side ? 'animate-bounce' : ''
  //     setTimeout(() => (this.animation = ''), 3500)
  //   },
  // },
  // mounted() {
  //   this.$bus.on('winner', this.manageWinner)
  // },
  // unmounted() {
  //   this.$bus.off('winner', this.manageWinner)
  // },
}
</script>
