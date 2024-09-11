<template>
  <div class="pb-4 pt-2">
    <div class="font-oswald px-3">
      <button
        class="btn block h-14 w-full items-center border-2 border-lime-700 bg-lime-500 text-3xl font-bold uppercase leading-none text-white"
        type="button"
      >
        <!-- <IconsLock class="h-8 w-8" /> -->
        Place bet
      </button>
    </div>

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
