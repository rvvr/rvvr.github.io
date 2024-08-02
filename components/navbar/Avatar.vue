<template>
  <!-- <NuxtLink class="flex" to="/profile"> -->
  <div v-if="src" class="avatar" role="button" tabindex="0">
    <div class="rounded-full bg-black">
      <img :src="src" class="rounded-full" alt="" />
    </div>
  </div>
  <!-- </NuxtLink> -->
</template>

<script>
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useUserStore, ['user']),

    src() {
      return this.user.avatar_url
        ? useRuntimeConfig().public.baseURL + this.user.avatar_url
        : `https://robohash.org/${this.user.user_id}.png?set=set3`
    },
  },
}
</script>
