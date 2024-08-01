<template>
  <div class="flex h-dvh w-full items-center justify-center">
    <div class="relative h-10 w-10">
      <!-- <div class="loading loading-ring loading-lg"></div> -->
      <img class="absolute left-1/2 top-1/2 -ml-2.5 -mt-2.5 h-5 animate-ping" alt="" src="/bf.png" />
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    definePageMeta({ layout: 'empty' })
  },
  mounted() {
    navigateTo('/home')
  },
}
</script>
