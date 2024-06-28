import { useUserStore } from '@/stores/user'

export default defineNuxtPlugin((nuxtApp) => {
  const userStore = useUserStore()

  const ws = new WebSocket('wss://game.demo.cryptobull.io/api/v1/ws')

  ws.onmessage = async function (event) {
    const data = JSON.parse(event.data)
    nuxtApp.$bus.emit('start', data)

    if (data.winner_side) {
      nuxtApp.$bus.emit('winner', data.winner_side)
      await userStore.fetchUser()
    }
  }
})
