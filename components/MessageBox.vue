<template>
  <div :class="animationClass" class="z-10 w-full text-center">
    <span
      v-show="message"
      class="font-oswald -mt-5 inline-block animate-pulse whitespace-break-spaces rounded-lg bg-[#09090b] bg-opacity-80 px-3 py-2 font-bold uppercase text-[#f4d56f]"
    >
      {{ message }}
    </span>
  </div>
</template>

<script>
import { mapState } from 'pinia'

export default {
  props: ['winSide'],
  computed: {
    ...mapState(useRoomStore, ['round_status']),

    message() {
      return {
        open: 'UP OR DOWN? PLACE YOUR TRADE!',
        running: 'No more trades! wait for results...',
        closed: this.winSide + ' wins! Distributing payouts',
      }[this.round_status]
    },
    animationClass() {
      return {
        open: '',
        running: '',
        closed: '',
      }[this.round_status]
    },
  },
}
</script>
