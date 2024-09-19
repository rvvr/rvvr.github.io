<template>
  <div class="font-mono">
    [sf: {{ sf.toFixed(1) }}] [sum_mov: {{ moveSum.toFixed(2) }}] [pm: {{ multiplier.toFixed(2) }}]
  </div>
</template>

<script>
import { mapState, mapWritableState } from '~/node_modules/pinia/dist/pinia'
export default {
  data() {
    return {
      av: 0.01,
      lastRate: 0,
      moveSum: 0,
      sf: 0.5,
    }
  },
  methods: {
    run() {},
  },

  mounted() {
    this.lastRate = this.rate
  },

  computed: {
    ...mapState(useRocketStore, ['ds', 'randomDiff', 'rate']),
    ...mapWritableState(useRocketStore, ['multiplier']),
  },

  watch: {
    ds(val) {
      if (val % 10 === 0) this.sf += 0.5
      this.moveSum += Math.abs(this.rate - this.lastRate) / 1_00000000
      this.lastRate = this.rate
      this.multiplier = this.moveSum * this.sf * this.av + 1
    },
  },
}
</script>
