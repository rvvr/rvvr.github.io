<template>
  <div class="font-oswald flex items-center">
    <div class="flex-1 px-4">
      <div class="flex justify-between">
        <div>{{ players.up.length }} players</div>
        <div class="text-right font-bold text-lime-500">{{ treasury.up }}</div>
      </div>
      <!-- <PlayersGrid side="up" /> -->
    </div>
    <div class="flex-1 px-4">
      <div class="flex justify-between">
        <div class="font-bold text-red-500">{{ treasury.down }}</div>
        <div class="text-right">{{ players.down.length }} players</div>
      </div>
      <!-- <PlayersGrid side="down" /> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useRoomStore, ['players', 'treasury']),
  },
}
</script>
