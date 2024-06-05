<template>
  <div :class="animationClass" class="absolute -bottom-8 z-10 w-full text-center">
    <span
      v-show="message"
      class="font-oswald inline-block whitespace-break-spaces rounded-lg bg-base-100 bg-opacity-20 px-3 py-2 font-bold uppercase text-[#f4d56f]"
    >
      {{ message }}
    </span>
    <span v-show="!message" class="loading loading-dots loading-md"></span>
  </div>
</template>

<script>
export default {
  props: ['state'],
  computed: {
    message() {
      const messages = {
        before: 'UP OR DOWN? PLACE YOUR TRADE!',
        after: 'Distributing payouts',
      }
      return messages[this.state.mode] || null
    },
    animationClass() {
      const animations = {
        before: 'animate-pulse',
        after: 'animate-bounce',
      }
      return animations[this.state.mode] || null
    },
  },
}
</script>

<style></style>
