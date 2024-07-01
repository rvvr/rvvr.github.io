<template>
  <NavbarView>
    <template #center>
      <NuxtLink to="/wallet/deposit/">
        <NavbarBalance :balance="user.balance" />
      </NuxtLink>
    </template>
  </NavbarView>

  <Game />
</template>

<script>
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useUserStore, ['user']),
  },
}
</script>
