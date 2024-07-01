<template>
  <div class="font-oswald relative">
    <div class="grid grid-cols-3 p-4">
      <div class="text-lime-400">
        <div class="text-1xl font-bold uppercase opacity-75">Up pool</div>
        <div class="font-black">
          <span class="text-3xl">{{ winRates.up }}</span>
          <span class="text-1xl font-normal"> (0.0)</span>
        </div>
        <div class="text-2xl font-medium">
          {{ winRates.up * 100 }}<span class="text-base font-normal">%</span>
        </div>
      </div>

      <div class="flex justify-center">
        <Timer></Timer>
      </div>

      <div class="text-right text-red-500">
        <div class="text-1xl font-bold uppercase opacity-75">Down pool</div>
        <div class="font-black">
          <span class="text-1xl font-normal">(0.0) </span>
          <span class="text-3xl">{{ winRates.down }}</span>
        </div>
        <div class="text-2xl font-medium">
          {{ winRates.down * 100 }}<span class="text-base font-normal">%</span>
        </div>
      </div>
    </div>

    <MessageBox />
  </div>

  <Graph />
  <Players />
  <Bets />
</template>

<script>
export default {
  data() {
    return {
      winRates: { up: 0, down: 0 },
    }
  },

  methods: {
    manageStart({ winRates }) {
      this.winRates = winRates
    },
  },

  mounted() {
    this.$bus.on('start', this.manageStart)
  },

  unmounted() {
    this.$bus.off('start', this.manageStart)
  },
}
</script>
