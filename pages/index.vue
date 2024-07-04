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
import { mapState, mapActions } from 'pinia'

export default {
  computed: {
    ...mapState(useUserStore, ['user']),
  },
  methods: {
    ...mapActions(useRoomStore, ['openRoomSocket', 'closeRoomSocket']),
    ...mapActions(useUserStore, ['fetchUser']),

    async manageWinner() {
      await this.fetchUser()
    },
  },
  mounted() {
    this.openRoomSocket()
    this.$bus.on('winner', this.manageWinner)
  },
  unmounted() {
    this.closeRoomSocket()
    this.$bus.off('winner', this.manageWinner)
  },
}
</script>
