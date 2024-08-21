import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useUserStore, ['user']),
  },

  mounted() {
    GameSocket.start(this.$route.params.room)
  },
  beforeUnmount() {
    GameSocket.stop()
  },
}
