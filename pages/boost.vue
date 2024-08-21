<template>
  <NavbarView class="!bg-[#09090b]">
    <template #center>
      <NuxtLink to="/home">
        <NavbarBalance :balance="user.balance" />
      </NuxtLink>
    </template>
  </NavbarView>

  <Game />

  <ModalsRoundClosed />
</template>

<script>
import { mapActions } from 'pinia'
import rooms from '~/mixins/rooms'

export default {
  mixins: [rooms],

  methods: {
    ...mapActions(useUserStore, ['fetchUser']),

    async manageWinner() {
      await this.fetchUser()
    },
  },
  mounted() {
    this.$bus.on('winner', this.manageWinner)
  },
  beforeUnmount() {
    this.$bus.off('winner', this.manageWinner)
  },
}
</script>
