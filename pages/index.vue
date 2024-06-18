<template>
  <div class="font-oswald relative">
    <div class="flex items-center justify-between p-4">
      <div class="text-lime-400">
        <div class="text-1xl font-bold uppercase opacity-75">Up pool</div>
        <div class="font-black">
          <span class="text-3xl">17.0</span><span class="text-1xl font-normal"> (0.0)</span>
        </div>
        <div class="text-2xl font-medium">177<span class="text-base font-normal">%</span></div>
      </div>

      <Timer></Timer>

      <div class="text-right text-red-500">
        <div class="text-1xl font-bold uppercase opacity-75">Down pool</div>
        <div class="font-black">
          <span class="text-1xl font-normal">(0.0) </span>
          <span class="text-3xl">17.0</span>
        </div>
        <div class="text-2xl font-medium">177<span class="text-base font-normal">%</span></div>
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
  mounted() {
    let counter = 0

    this.$bus.on('sec', () => {
      if (counter === 0) {
        this.$bus.emit('start', {
          mode: 'before',
          time: 20000, //optional?
          left: 20000,
          next: 10000, // ?
        })
      }

      if (counter === 20) {
        this.$bus.emit('start', {
          mode: 'active',
          time: 10000,
          left: 10000,
          players: [], //and other info
        })
      }

      if (counter === 30) {
        this.$bus.emit('start', {
          mode: 'after',
          time: null,
          left: null,
        })
      }

      if (counter === 40) {
        counter = 0
      } else {
        counter++
      }
    })
  },
}
</script>
