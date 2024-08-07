import throttle from 'lodash.throttle'

let cache

export class TradeSocket {
  wss = null

  static start(cb, symbol = 'btcusdt') {
    this.wss = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`)
    this.wss.onmessage = throttle(({ data }) => {
      const price = JSON.parse(data).p
      if (cache === price) return
      cache = price
      cb(price)
    }, 100)
  }

  static stop() {
    this.wss.close()
  }
}
