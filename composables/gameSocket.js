export class GameSocket {
  wss = null

  static start(room_id) {
    useRoomStore().$reset()

    this.wss = new WebSocket('wss://game.demo.cryptobull.io/api/v1/ws' + (room_id ? `/${room_id}` : ''))
    timer.start()

    this.wss.onmessage = ({ data }) => {
      data = JSON.parse(data)

      const nuxtApp = useNuxtApp()

      nuxtApp.$bus.emit('start', data)
      useRoomStore().$reset()
      useRoomStore().$patch(data)

      if (data.winner_side) {
        nuxtApp.$bus.emit('winner', data.winner_side)
      }

      if (data.current_round_number === data.max_round_number && data.round_status === 'closed') {
        nuxtApp.$bus.emit('closeRoom')
      }
    }
  }

  static stop() {
    this.wss.close()
    timer.stop()
  }
}
