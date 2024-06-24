<template>
  <button class="btn join-item btn-neutral btn-lg -mt-8 pt-4">
    <IconsWallet class="h-4 w-4 opacity-80" />
    <span class="font-oswald text-xl font-bold leading-none">
      {{ user.balance }}
    </span>
  </button>
</template>

<script>
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useUserStore, ['user']),
  },
}
</script>
