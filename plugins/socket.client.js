export default defineNuxtPlugin((nuxtApp) => {
  const ws = new WebSocket('wss://game.demo.cryptobull.io/api/v1/ws')

  ws.onmessage = function (event) {
    // console.log(event.data)
  }
})
