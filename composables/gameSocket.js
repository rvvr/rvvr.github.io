let wss = null

export class GameSocket {
  static start(room_id) {
    useRoomStore().$reset()

    wss = new WebSocket('wss://game.demo.cryptobull.io/api/v1/ws' + (room_id ? `/${room_id}` : ''))
    Timer.start()

    wss.onmessage = ({ data }) => {
      data = JSON.parse(data)

      if (data.current_price) {
        useRoomStore().current_price = data.current_price
        return
      }

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
    wss.close()
    Timer.stop()
  }
}
