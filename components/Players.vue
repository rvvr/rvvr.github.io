<template>
  <div class="font-oswald grid grid-cols-4 gap-4 px-4 pt-3">
    <div>{{ players.up.length }} players</div>
    <div class="text-right font-bold text-lime-500">{{ treasury.up }}</div>
    <div class="font-bold text-red-500">{{ treasury.down }}</div>
    <div class="text-right">{{ players.down.length }} players</div>
  </div>
  <div class="grid h-10 grid-cols-2 gap-4 px-4 pb-1">
    <PlayersGrid side="up" />
    <PlayersGrid side="down" />
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
