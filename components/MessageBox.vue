<template>
  <div :class="animationClass" class="absolute -bottom-8 z-10 w-full text-center">
    <span
      v-show="message"
      class="font-oswald inline-block whitespace-break-spaces rounded-lg bg-base-100 bg-opacity-20 px-3 py-2 font-bold uppercase text-[#f4d56f]"
    >
      {{ message }}
    </span>
  </div>
</template>

<script>
export default {
  props: ['state'],
  computed: {
    message() {
      const messages = {
        before: 'UP OR DOWN? PLACE YOUR TRADE!',
        active: 'No more trades! wait for results...',
        after: 'Distributing payouts',
      }
      return messages[this.state.mode] || null
    },
    animationClass() {
      const animations = {
        before: '',
        after: 'animate-pulse',
      }
      return animations[this.state.mode] || null
    },
  },
}
</script>
