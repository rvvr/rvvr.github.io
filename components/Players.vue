<template>
  <div class="bg-[#09090b]">
    <div class="font-oswald flex items-center">
      <div class="flex-1 px-4">
        <div class="flex justify-between">
          <div>{{ players.up.length }} players</div>
          <div class="text-right font-bold text-lime-500">{{ winRates.up * 100 }}%</div>
        </div>
      </div>
      <div class="flex-1 px-4">
        <div class="flex justify-between">
          <div class="font-bold text-red-500">{{ winRates.down * 100 }}%</div>
          <div class="text-right">{{ players.down.length }} players</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useRoomStore, ['players', 'winRates']),
  },
}
</script>
