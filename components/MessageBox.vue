<template>
  <div :class="animationClass" class="absolute -bottom-12 z-10 w-full text-center">
    <span
      v-show="message"
      class="font-oswald inline-block whitespace-break-spaces rounded-lg bg-base-100 bg-opacity-20 px-3 py-2 font-bold uppercase text-[#f4d56f]"
    >
      {{ message }}
    </span>
  </div>
</template>

<script>
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useRoomStore, ['round_status']),

    message() {
      return {
        open: 'UP OR DOWN? PLACE YOUR TRADE!',
        running: 'No more trades! wait for results...',
        closed: 'Distributing payouts',
      }[this.round_status]
    },
    animationClass() {
      return {
        open: '',
        running: '',
        closed: 'animate-pulse',
      }[this.round_status]
    },
  },
}
</script>
