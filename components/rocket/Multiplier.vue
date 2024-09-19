<template>
  <div class="font-oswald w-full text-center text-5xl font-bold text-neutral-content">
    {{ multiplier.toFixed(2) }}x
  </div>
  <!-- <div class="font-mono">
    [sf: {{ sf.toFixed(1) }}] [sum_mov: {{ moveSum.toFixed(2) }}] [pm: {{ multiplier.toFixed(2) }}]
  </div> -->
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
    ...mapState(useRocketStore, ['ds', 'randomDiff', 'rate']),
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
