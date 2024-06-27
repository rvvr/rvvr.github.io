<template>
  <div class="flex-1 p-1">
    <Loader :data="rooms">
      <template #empty>
        <div class="text-center opacity-50">No active rooms yet</div>
      </template>
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
              <NuxtLink :to="`/rooms/${i}`">
                <button class="btn btn-neutral w-24">Enter</button>
              </NuxtLink>
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
    ...mapActions(useRoomStore, ['getUserRooms']),
  },

  async mounted() {
    this.rooms = await this.getUserRooms(this.user.user_id)
  },
}
</script>
