export default defineNuxtPlugin((nuxtApp) => {
  const ws = new WebSocket('wss://game.demo.cryptobull.io/api/v1/ws')

  ws.onmessage = function (event) {
    const data = JSON.parse(event.data)
    const modes = {
      open: 'before',
      running: 'active',
      closed: 'after',
    }
    const { time, left, next } = data

    nuxtApp.$bus.emit('start', {
      mode: modes[data.round_status],
      time,
      left,
      next,
    })
  }
})
