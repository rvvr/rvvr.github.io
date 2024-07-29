<template>
  <NavbarView class="bg-[#09090b]">
    <template #center>
      <NuxtLink to="/home">
        <NavbarBalance :balance="user.balance" />
      </NuxtLink>
    </template>
  </NavbarView>

  <Game />
</template>

<script>
import { mapState, mapActions } from 'pinia'

export default {
  data() {
    return {
      wss: null,
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
  },
  methods: {
    ...mapActions(useRoomStore, ['openRoomSocket', 'manageSocketEvent']),
    ...mapActions(useUserStore, ['fetchUser']),

    async manageWinner() {
      await this.fetchUser()
    },
  },
  mounted() {
    timer.start()
    this.wss = this.openRoomSocket()
    this.wss.onmessage = this.manageSocketEvent

    this.$bus.on('winner', this.manageWinner)
  },
  unmounted() {
    timer.stop()
    this.wss.close()

    this.$bus.off('winner', this.manageWinner)
  },
}
</script>
