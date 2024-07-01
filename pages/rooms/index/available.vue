<template>
  <div class="flex-1 p-1">
    <Loader :data="rooms">
      <table class="table table-sm">
        <tbody>
          <tr v-for="(room, i) in rooms" :key="i">
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle h-12 w-12 bg-secondary">
                    <img :src="`https://robohash.org/${room.id}.png`" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div class="font-bold text-neutral-content">{{ room.name }}</div>
                  <div>{{ new Date(room.start_date).toLocaleDateString('en-GB') }}</div>
                </div>
              </div>
            </td>

            <td>{{ room.current_participants }}/{{ room.max_participants }}</td>

            <td class="text-right">
              <button v-if="room.status === 'open'" @click="join(room.id, $event)" class="btn w-24">
                Join
              </button>
              <button v-else class="btn w-24 !text-neutral-content" disabled>Full</button>
            </td>
          </tr>
        </tbody>
      </table>
    </Loader>
  </div>
</template>

<script>
import { mapActions } from 'pinia'

export default {
  data() {
    return {
      rooms: null,
    }
  },

  methods: {
    ...mapActions(useRoomStore, ['getOpenRooms', 'joinRoom']),

    async join(id, event) {
      event.target.disabled = true
      const { success } = await this.joinRoom(id)
      if (success) {
        navigateTo('/rooms/' + id)
      }
      event.target.disabled = false
    },
  },

  async mounted() {
    this.rooms = await this.getOpenRooms()
  },
}
</script>
