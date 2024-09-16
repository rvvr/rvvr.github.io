<template>
  <NavbarView class="!bg-[#09090b]">
    <template #center>
      <NuxtLink to="/home">
        <NavbarBalance :balance="user.balance" />
      </NuxtLink>
    </template>
  </NavbarView>

  <div class="flex flex-1 bg-[#09090b]">
    <RocketGame class="flex-1" />

    <div class="absolute left-0 top-1/2 w-full px-4 text-center">
      <div class="font-oswald">Waiting for next round</div>
      <progress class="progress progress-error w-1/2" max="100" value="50"></progress>
    </div>
  </div>

  <RocketBet />
</template>

<script>
import { mapState } from '~/node_modules/pinia/dist/pinia'

export default {
  computed: {
    ...mapState(useUserStore, ['user']),
  },
}
</script>
