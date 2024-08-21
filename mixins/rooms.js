import { mapState } from 'pinia'

export default {
  methods: {
    closeRoomSocket() {
      GameSocket.stop()
    },
  },

  computed: {
    ...mapState(useUserStore, ['user']),
  },

  mounted() {
    GameSocket.start(this.$route.params.room)
  },
  unmounted() {
    this.closeRoomSocket()
  },
}
