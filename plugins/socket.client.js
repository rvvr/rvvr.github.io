export default defineNuxtPlugin((nuxtApp) => {
  const ws = new WebSocket('wss://game.demo.cryptobull.io/api/v1/ws')
  const modes = {
    open: 'before',
    running: 'active',
    closed: 'after',
  }

  ws.onmessage = function (event) {
    const data = JSON.parse(event.data)
    const { time, left, next, winner_side } = data

    nuxtApp.$bus.emit('start', {
      mode: modes[data.round_status],
      time,
      left,
      next,
    })

    // if (winner_side) {
    //   nuxtApp.$bus.emit('winner', winner_side)
    // }
  }
})
