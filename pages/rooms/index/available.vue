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
                    <img :src="`https://robohash.org/${i}.png`" alt="Avatar Tailwind CSS Component" />
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
              <button v-if="room.status === 'open'" class="btn w-24">Sign up</button>
              <button v-else class="btn w-24 !text-neutral-content" disabled>Full</button>
            </td>
          </tr>
        </tbody>
      </table>
    </Loader>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'

export default {
  data() {
    return {
      rooms: null,
    }
  },

  computed: {
    ...mapState(useUserStore, ['user']),
  },

  methods: {
    ...mapActions(useRoomStore, ['getOpenRooms']),
  },

  async mounted() {
    this.rooms = await this.getOpenRooms()
  },
}
</script>
