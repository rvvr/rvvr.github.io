export const useRoomStore = defineStore('room', {
  state: () => ({}),

  actions: {
    async getRoom(room_id) {
      return await api.get(`/room/${room_id}`)
    },

    async getUserRooms(user_id) {
      return await api.get(`/user_rooms/${user_id}`)
    },

    async getOpenRooms() {
      return await api.get(`/rooms`)
    },

    async joinRoom(user_id, room_id) {
      return await api.post('/room/join', {
        user_id,
        room_id,
      })
    },
  },
})
