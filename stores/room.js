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
    rewards: null,
    current_price: null,
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

    async getRoomHistory(id) {
      return await api.get('/stats/' + id)
    },

    async getRooms(game_type = null) {
      return await api.get('/rooms/' + (game_type ? `?game_type=${game_type}` : ''))
    },

    async joinRoom(room_id) {
      return await api.post('/room/join', { room_id, user_id: this.user_id })
    },

    addPlayer(side) {
      this.players[side].unshift(useUserStore().user)
    },
  },
})
