<template>
  <NavbarView>
    <template #center>
      <div class="font-bold text-neutral-content">Freeroll rooms</div>
    </template>
  </NavbarView>

  <div class="px-4">
    <NuxtLink to="rooms/rewards">
      <button class="font-oswald btn btn-neutral my-4 w-full text-lg leading-none">
        <IconsTrophy class="h-4 w-4 text-neutral-content" />
        <span>My rewards</span>
      </button>
    </NuxtLink>

    <Loader :data="rooms">
      <template #empty>
        <div class="text-center opacity-50">No active rooms yet</div>
      </template>

      <RoomCard
        v-for="(room, i) in rooms"
        :key="i"
        :index="i"
        :join="join"
        :room="room"
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
    ...mapActions(useRoomStore, ['joinRoom', 'getRooms']),

    async fetch() {
      const { active, available } = await this.getRooms()

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
