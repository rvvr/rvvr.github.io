<template>
  <div class="font-mono">
    [sf: {{ sf.toFixed(1) }}] [sum_mov: {{ moveSum.toFixed(2) }}] [pm: {{ payoutMultiplier.toFixed(4) }}]
  </div>
</template>

<script>
import { mapState } from '~/node_modules/pinia/dist/pinia'
export default {
  data() {
    return {
      av: 0.005,
      lastRate: 0,
      moveSum: 0,
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

    sf() {
      return (Math.floor(this.ds * 0.1) + 1) / 2
    },

    payoutMultiplier() {
      return this.moveSum * this.sf * this.av + 1
    },
  },

  watch: {
    ds(val) {
      // if (val % 10 === 0) {
      this.moveSum += Math.abs(this.rate - this.lastRate) / 1_00000000
      this.lastRate = this.rate
      // }
    },
  },
}
</script>
