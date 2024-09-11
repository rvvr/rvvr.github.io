<template>
  <div class="pb-4 pt-2">
    <RocketBetButton />

    <BetSize v-model="betSize" :balance="user.balance" />
  </div>
</template>

<script>
import { mapState } from '~/node_modules/pinia/dist/pinia'

export default {
  data() {
    return {
      betSize: null,
    }
  },

  computed: {
    ...mapState(useUserStore, ['user']),
  },

  created() {
    this.betSize = 1 + Math.floor(this.user.balance * 0.5)
  },
}
</script>
