<template>
  <NavbarView>
    <template #center>
      <div class="font-bold text-neutral-content">Rooms</div>
    </template>
  </NavbarView>

  <div class="p-4 pb-0">
    <Loader :data="rooms">
      <template #empty>
        <div class="text-center opacity-50">No active rooms yet</div>
      </template>

      <RoomCard
        v-for="(room, i) in rooms"
        :key="i"
        :gameType="gameType"
        :index="i"
        :join="join"
        :room="room"
        :vacancies="room.max_participants - room.current_participants"
        class="carousel-item"
      />
    </Loader>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
let interval = null

export default {
  data() {
    return {
      availableRooms: null,
      activeRooms: null,
      interval: null,
    }
  },

  computed: {
    rooms() {
      if (!this.availableRooms && !this.activeRooms) return null
      const rooms = [...this.activeRooms, ...this.availableRooms]
      return rooms.length ? rooms.sort((a, b) => a.id - b.id) : []
    },
    gameType() {
      return this.$route.query.game_type || 'trade'
    },
  },

  methods: {
    ...mapActions(useRoomStore, ['joinRoom', 'getRooms']),

    async fetch() {
      const { active, available } = await this.getRooms(this.$route.query.game_type)

      this.activeRooms = active
        .filter((r) => r.status !== 'ended')
        .map((r) => {
          r.active = true
          return r
        })
      this.availableRooms = available //.sort((a, b) => a.id - b.id)
    },

    async join(id, event) {
      event.target.disabled = true
      await this.joinRoom(id)
      await this.fetch()
    },
  },

  async mounted() {
    await this.fetch()
    interval = setInterval(() => this.fetch(), 10000)
  },

  beforeUnmount() {
    clearInterval(interval)
  },
}
</script>
