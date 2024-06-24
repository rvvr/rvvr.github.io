<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
import { mapActions } from 'pinia'

export default {
  methods: {
    ...mapActions(useUserStore, ['initUser']),
  },

  async mounted() {
    await this.initUser()
  },
}
</script>
