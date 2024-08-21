import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useUserStore, ['user']),
  },

  mounted() {
    GameSocket.start(this.$route.params.room)
  },
  unmounted() {
    GameSocket.stop()
  },
}
