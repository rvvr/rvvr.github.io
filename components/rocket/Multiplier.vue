<template>
  <!-- <div class="absolute bottom-8 left-0 w-full animate-pulse">
    <div class="font-oswald w-full text-center text-5xl font-bold text-neutral-content">
      {{ multiplier.toFixed(2) }}x
    </div>
  </div> -->

  <div class="font-oswald absolute bottom-2 z-10 w-full animate-pulse text-center font-bold uppercase">
    <span class="-mt-5 inline-block py-2 text-sm text-[#f4d56f]">{{ multiplier.toFixed(2) }}x</span>
  </div>
</template>

<script>
import { mapState, mapWritableState } from '~/node_modules/pinia/dist/pinia'
export default {
  data() {
    return {
      av: 0.01,
      moveSum: 0,
      sf: 0.5,
    }
  },
  methods: {
    run() {},
  },

  computed: {
    ...mapState(useRocketStore, ['ds', 'rate']),
    ...mapWritableState(useRocketStore, ['multiplier']),
  },

  watch: {
    rate(val, old) {
      this.moveSum += Math.abs(old - val) / 1_00000000
      this.multiplier = this.moveSum * this.sf * this.av + 1
    },
    ds(val) {
      if (val % 10 === 0) this.sf += 0.5
    },
  },
}
</script>
