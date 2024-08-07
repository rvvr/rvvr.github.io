<template>
  <NavbarView class="!bg-[#09090b]">
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
import rooms from '~/mixins/rooms'

export default {
  mixins: [rooms],

  data() {
    return {
      wss: null,
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
  },
  methods: {
    ...mapActions(useUserStore, ['fetchUser']),

    async manageWinner() {
      await this.fetchUser()
    },
  },
  mounted() {
    this.openRoomSocket(this.$route.params.room)
    this.$bus.on('winner', this.manageWinner)
  },
  unmounted() {
    this.closeRoomSocket()
    this.$bus.off('winner', this.manageWinner)
  },
}
</script>
