export class GameSocket {
  wss = null

  static start(room_id, cb) {
    this.wss = new WebSocket('wss://game.demo.cryptobull.io/api/v1/ws' + (room_id ? `/${room_id}` : ''))
    this.wss.onmessage = ({ data }) => cb(JSON.parse(data))
  }

  static stop() {
    this.wss.close()
  }
}
