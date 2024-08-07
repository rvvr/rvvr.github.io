export default {
  methods: {
    openRoomSocket(room_id) {
      useRoomStore().$reset()
      GameSocket.start(room_id, this.manageSocketEvent)
      timer.start()
    },

    closeRoomSocket() {
      GameSocket.stop()
      timer.stop()
    },

    manageSocketEvent(data) {
      const nuxtApp = useNuxtApp()

      useRoomStore().$patch(data)
      nuxtApp.$bus.emit('start', data)

      if (data.winner_side) {
        // nuxtApp.$bus.emit('winner', data.winner_side)
      }

      if (data.current_round_number === data.max_round_number && data.round_status === 'closed') {
        nuxtApp.$bus.emit('closeRoom')
      }
    },
  },
}
