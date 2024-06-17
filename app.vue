<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
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
