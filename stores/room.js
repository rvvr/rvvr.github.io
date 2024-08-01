export const useRoomStore = defineStore('room', {
  state: () => ({
    round_id: null,
    current_cycle_number: null,
    room: {
      name: null,
      id: null,
    },
    round_status: null,
    startRate: null,
    endRate: null,
    winner_side: null,
    players: {
      up: [],
      down: [],
    },
    winRates: {
      up: null,
      down: null,
    },
    treasury: {
      down: null,
      up: null,
    },
    time: null,
    left: null,
    next: null,
    standings: [],
    current_round_number: null,
    max_round_number: null,
  }),

  getters: {
    user_id() {
      return useUserStore().user.user_id
    },
    userRating() {
      return this.standings.find((c) => c.user_id === this.user_id) || {}
    },
    roomRating() {
      return this.standings.sort((a, b) => a.position - b.position)
    },
  },

  actions: {
    // async getRoom(room_id) {
    //   return await api.get(`/room/${room_id}`)
    // },

    async getRoomRating(id) {
      return await api.get('/standings/' + id)
    },

    async getUserRooms() {
      return await api.get(`/rooms/active/` + this.user_id)
    },

    async getOpenRooms() {
      return await api.get(`/rooms/available/` + this.user_id)
    },

    async joinRoom(room_id) {
      return await api.post('/room/join', {
        user_id: this.user_id,
        room_id,
      })
    },

    openRoomSocket(room_id) {
      this.$reset()
      return new WebSocket('wss://game.demo.cryptobull.io/api/v1/ws' + (room_id ? `/${room_id}` : ''))
    },

    manageSocketEvent(event) {
      const nuxtApp = useNuxtApp()
      const data = JSON.parse(event.data)

      this.$patch(data)
      nuxtApp.$bus.emit('start', data)

      if (this.winner_side) {
        // nuxtApp.$bus.emit('winner', data.winner_side)
      }

      if (this.current_round_number === this.max_round_number && this.round_status === 'closed') {
        nuxtApp.$bus.emit('closeRoom')
      }
    },

    addPlayer(side) {
      this.players[side].unshift(useUserStore().user)
    },
  },
})
