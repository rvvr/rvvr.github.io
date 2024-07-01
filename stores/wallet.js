export const useWalletStore = defineStore('wallet', {
  actions: {
    async placeBet(bet_side, bet_amount) {
      const user_id = useUserStore().user.user_id
      const room_id = +useRoomStore().room.id
      await api.post('/bet', { bet_amount, bet_side, user_id, room_id })
    },
  },
})
