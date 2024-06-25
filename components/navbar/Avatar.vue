<template>
  <div v-if="avatar" class="avatar h-10 min-h-10 w-10" role="button" tabindex="0">
    <div class="h-10 w-10 rounded-full bg-black">
      <img :src="avatar" class="rounded-full" alt="" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useUserStore, ['avatar']),
  },
}
</script>
