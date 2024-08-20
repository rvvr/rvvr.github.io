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
    actual_time_left: null,
    rewards: {},
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
    async getRoomRating(id) {
      return await api.get('/standings/' + id)
    },

    async getRooms() {
      return await api.get(`/rooms/`)
    },

    async joinRoom(room_id) {
      return await api.post('/room/join', { room_id })
    },

    addPlayer(side) {
      this.players[side].unshift(useUserStore().user)
    },
  },
})
