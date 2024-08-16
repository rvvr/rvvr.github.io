import throttle from 'lodash.throttle'
import mean from 'lodash.mean'
import times from 'lodash.times'

let arr = []
let oldPrice = null

export class PriceSocket {
  wss = null

  static start(cb) {
    this.wss = new WebSocket('wss://lowecase-exchange-name.ws-ds.md.coinapi.io/')
    // this.wss = new WebSocket('wss://game.demo.cryptobull.io/api/v1/datafeed/BTCUSD')

    this.wss.onopen = (event) => {
      this.wss.send(
        JSON.stringify({
          type: 'hello',
          apikey: '5D93F49C-BA73-4CBF-9777-865854D5BC5A',
          heartbeat: false,
          subscribe_data_type: ['quote'],
          subscribe_filter_asset_id: ['BTC/USDT'],
        }),
      )
    }

    this.wss.addEventListener('message', ({ data }) => {
      const { ask_price, symbol_id } = JSON.parse(data)
      if (symbol_id.includes('_OPT_')) return
      if (symbol_id.includes('_PERP_')) return
      // if (ask_price < 56000) return
      // if (ask_price > 65000) return
      if (oldPrice && Math.abs(oldPrice - ask_price) > 2000) return
      arr.push(ask_price)
    })

    this.wss.addEventListener(
      'message',
      throttle(({ data }) => {
        if (!arr.length) return
        const price = mean(arr)
        oldPrice = price
        cb(price)
        arr = []
      }, 1000),
    )
  }

  static stop() {
    this.wss.close()
  }
}
