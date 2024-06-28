let wss

export const useRoomStore = defineStore('room', {
  state: () => ({
    wss: null,
    room_id: null,
  }),

  actions: {
    async getRoom(room_id) {
      return await api.get(`/room/${room_id}`)
    },

    async getUserRooms() {
      const userStore = useUserStore()
      return await api.get(`/user_rooms/${userStore.user.user_id}`)
    },

    async getOpenRooms() {
      return await api.get(`/rooms`)
    },

    async joinRoom(room_id) {
      const userStore = useUserStore()
      return await api.post('/room/join', {
        user_id: userStore.user.user_id,
        room_id,
      })
    },

    getRoomSocket(id) {
      const userStore = useUserStore()
      const nuxtApp = useNuxtApp()

      wss = new WebSocket('wss://game.demo.cryptobull.io/api/v1/ws/' + id)
      wss.onclose = () => console.log(`Disconnected from room: ${id}`)

      wss.onmessage = async (event) => {
        const data = JSON.parse(event.data)
        nuxtApp.$bus.emit('start', data)
        if (data.winner_side) {
          nuxtApp.$bus.emit('winner', data.winner_side)
          await userStore.fetchUser()
        }
      }
      wss.onopen = () => {
        console.log(`Connected to room: ${id}`)
        this.room_id = id
      }
    },

    closeRoomSocket() {
      wss.close()
      this.room_id = null
    },
  },
})
