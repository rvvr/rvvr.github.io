export default defineNuxtPlugin((nuxtApp) => {
  const ws = new WebSocket('wss://game.demo.cryptobull.io/api/v1/ws')

  ws.onmessage = function (event) {
    console.log(event.data)
  }

  let counter = 0

  nuxtApp.$bus.on('sec', () => {
    if (counter === 0) {
      nuxtApp.$bus.emit('start', {
        mode: 'before',
        time: 20000, //optional?
        left: 20000,
        next: 10000, // ?
      })
    }

    if (counter === 20) {
      nuxtApp.$bus.emit('start', {
        mode: 'active',
        time: 10000,
        left: 10000,
        players: [], //and other info
      })
    }

    if (counter === 30) {
      nuxtApp.$bus.emit('start', {
        mode: 'after',
        time: null,
        left: null,
      })
    }

    if (counter === 40) {
      counter = 0
    } else {
      counter++
    }
  })
})
