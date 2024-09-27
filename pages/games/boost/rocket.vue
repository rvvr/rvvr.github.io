<template>
  <NavbarView class="!bg-[#09090b]">
    <template #center>
      <NuxtLink to="/home">
        <NavbarBalance :balance="user.balance" />
      </NuxtLink>
    </template>
  </NavbarView>

  <RocketWrap />
</template>

<script>
import { mapState, mapWritableState } from '~/node_modules/pinia/dist/pinia'

export default {
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapWritableState(useRocketStore, ['room']),
  },

  created() {
    this.room = false
  },
}
</script>
