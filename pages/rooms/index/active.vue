<template>
  <div class="flex-1 p-4">
    <Loader :data="rooms">
      <template #empty>
        <div class="text-center opacity-50">No active rooms yet</div>
      </template>

      <div
        v-for="(room, i) in rooms"
        :key="i"
        class="card card-compact mb-4 bg-white bg-opacity-10 shadow-xl"
      >
        <figure class="h-40 bg-orange-300">
          <img :src="`https://robohash.org/${room.id}.png`" />
        </figure>
        <div class="card-body">
          <h2 class="card-title block">
            <span v-if="room.price_pool" class="badge badge-warning badge-lg mr-1 align-text-bottom">
              <IconsTrophy class="h-3 w-3" />
              {{ room.price_pool }}
            </span>
            {{ room.name }}
          </h2>
          <p>{{ room.description }}</p>
          <div class="card-actions items-center pt-1">
            <div class="kbd text-sm">
              <IconsUser class="mr-1 h-3 w-3 text-white opacity-50" />
              <span class="pt-[1px] opacity-90">1/10000</span>
            </div>
            <div class="kbd text-sm">
              <IconsCalendar class="mr-1 h-3 w-3 text-white opacity-50" />
              <span class="pt-[1px] opacity-90">
                {{ new Date(room.start_date).toLocaleDateString('en-GB') }}
              </span>
              <span class="pl-1 pt-[1px] opacity-90">
                {{ new Date(room.start_date).toLocaleTimeString('en-GB').slice(0, -3) }}
              </span>
            </div>
          </div>

          <div class="card-actions pt-3">
            <NuxtLink :to="`/rooms/${room.id}`" class="w-full">
              <button class="btn btn-neutral w-full">Enter room</button>
            </NuxtLink>
          </div>
        </div>
      </div>
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
    ...mapActions(useRoomStore, ['getUserRooms']),
  },

  async mounted() {
    this.rooms = await this.getUserRooms()
    this.rooms = this.rooms.filter((r) => r.status !== 'ended')
  },
}
</script>
