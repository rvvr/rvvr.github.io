<template>
  <div class="card card-compact mb-4 bg-white bg-opacity-10 shadow-xl">
    <!-- <figure class="h-40 bg-orange-300">
      <img :src="`https://robohash.org/${room.id}.png`" />
    </figure> -->
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
        <button v-if="!room.active" @click="join(room.id, $event)" class="btn btn-neutral w-full">
          Join room
        </button>

        <NuxtLink v-else-if="room.status === 'running'" :to="`/rooms/${room.id}`" class="w-full">
          <button class="btn btn-neutral w-full">Enter room</button>
        </NuxtLink>

        <button v-else class="btn btn-neutral w-full !text-opacity-80" disabled>
          <IconsTime class="h-4 w-4 opacity-80" />
          {{ room.time_to_start_str }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['room', 'join'],
}
</script>
