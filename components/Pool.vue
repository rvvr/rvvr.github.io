<template>
  <div class="text-1xl font-bold uppercase opacity-75">{{ side }} pool</div>
  <div class="font-black">
    <span class="text-3xl">{{ winRates[side] }}</span>
    <span class="text-1xl font-normal"> (0.0)</span>
  </div>
  <div class="text-2xl font-medium">
    {{ winRates[side] * 100 }}<span class="text-base font-normal">%</span>
  </div>
</template>

<script>
import { mapState } from 'pinia'

export default {
  props: ['side'],
  computed: {
    ...mapState(useRoomStore, ['winRates']),
  },
}
</script>
