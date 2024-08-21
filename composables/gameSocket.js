export class GameSocket {
  wss = null

  static start(room_id) {
    useRoomStore().$reset()

    this.wss = new WebSocket('wss://game.demo.cryptobull.io/api/v1/ws' + (room_id ? `/${room_id}` : ''))
    Timer.start()

    this.wss.onmessage = ({ data }) => {
      data = JSON.parse(data)

      const nuxtApp = useNuxtApp()

      nuxtApp.$bus.emit('start', data)
      useRoomStore().$reset()
      useRoomStore().$patch(data)

      if (data.winner_side) {
        nuxtApp.$bus.emit('winner', data.winner_side)
      }
    }
  }

  static stop() {
    this.wss.close()
    Timer.stop()
  }
}
