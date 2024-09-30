let wss = null

export class RocketSocket {
  static start() {
    wss = new WebSocket('wss://game.demo.cryptobull.io/api/v1/game/rocket/' + useRocketStore().room)

    wss.onmessage = ({ data }) => {
      data = JSON.parse(data)
      this.stop()
    }
  }

  static stop() {
    wss.close()
    useNuxtApp().$bus.emit('stopRocket')
  }
}
