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
    ...mapActions(useUserStore, ['getUserFromApp', 'manageUser']),
  },

  async mounted() {
    this.getUserFromApp()
    await this.manageUser()
  },
}
</script>
