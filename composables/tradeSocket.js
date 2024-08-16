export class TradeSocket {
  wss = null
  oldPrice = null

  static start(cb, symbol = 'btcusdt') {
    this.wss = new WebSocket(`wss://game.demo.cryptobull.io/api/v1/datafeed/BTCUSD`)

    this.wss.onmessage = ({ data }) => {
      data = JSON.parse(data)

      if (!this.oldPrice) this.oldPrice = data.price
      if (data.price < 1 || Math.abs(this.oldPrice - data.price) > 5000) return

      cb(data.price)
      this.oldPrice = data.price
    }
  }

  static stop() {
    this.wss.close()
  }
}
