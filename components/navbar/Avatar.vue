<template>
  <NuxtLink class="flex" to="/profile">
    <div v-if="avatar" class="avatar" role="button" tabindex="0">
      <div class="rounded-full bg-black">
        <img :src="avatar" class="rounded-full" alt="" />
      </div>
    </div>
  </NuxtLink>
</template>

<script>
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useUserStore, ['avatar']),
  },
}
</script>
