<template>
  <NavbarView>
    <template #center>
      <div class="font-bold text-neutral-content">Freeroll rooms</div>
    </template>
  </NavbarView>

  <div class="px-4">
    <Loader :data="rooms">
      <template #empty>
        {{ rooms }}
        <div class="text-center opacity-50">No active rooms yet</div>
      </template>

      <Card v-for="(room, i) in rooms" :key="i" :join="join" :room="room" class="carousel-item" />
    </Loader>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { setInterval } from '#imports'
let interval = null

export default {
  data() {
    return {
      availableRooms: [],
      activeRooms: [],
      interval: null,
    }
  },

  computed: {
    rooms() {
      const rooms = [...this.activeRooms, ...this.availableRooms]

      return rooms.length ? rooms.sort((a, b) => a.id - b.id) : null
    },
  },

  methods: {
    ...mapActions(useRoomStore, ['getUserRooms', 'getOpenRooms', 'joinRoom']),

    async fetch() {
      const [activeRooms, availableRooms] = await Promise.all([this.getUserRooms(), this.getOpenRooms()])
      this.activeRooms = activeRooms
        .filter((r) => r.status !== 'ended')
        .map((r) => {
          r.active = true
          return r
        })
      this.availableRooms = availableRooms //.sort((a, b) => a.id - b.id)
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

  unmounted() {
    clearInterval(interval)
  },
}
</script>
