<template>
  <div class="flex h-dvh w-full items-center justify-center">
    <span class="loading loading-ring loading-lg"></span>
  </div>
</template>

<script>
export default {
  setup() {
    definePageMeta({
      layout: 'empty',
    })
  },

  mounted() {
    navigateTo('/home')
  },
}
</script>
