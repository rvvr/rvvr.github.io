<template>
  <div class="font-oswald relative">
    <div class="flex items-center justify-between p-4">
      <div class="text-lime-400">
        <div class="text-1xl font-bold uppercase opacity-75">Up pool payout</div>
        <div class="font-black">
          <span class="text-3xl">17.0</span><span class="text-1xl font-normal">(0.0)</span>
        </div>
        <div class="text-2xl font-medium">177<span class="text-base font-normal">%</span></div>
      </div>

      <Timer :state="state"></Timer>

      <div class="text-right text-red-500">
        <div class="text-1xl font-bold uppercase opacity-75">Up pool payout</div>
        <div class="font-black">
          <span class="text-1xl font-normal">(0.0)</span>
          <span class="text-3xl">17.0</span>
        </div>
        <div class="text-2xl font-medium">177<span class="text-base font-normal">%</span></div>
      </div>
    </div>

    <MessageBox :state="state" />
  </div>

  <Graph :state="state" />
  <Players :state="state" />
  <Bets :state="state" />
</template>

<script>
export default {
  data() {
    return {
      state: {},
      counter: 0, //remove
    }
  },
  mounted() {
    this.$bus.on('sec', () => {
      if (this.counter === 0) {
        this.state = {
          mode: 'before',
          time: 20000, //optional?
          left: 20000,
        }
        this.$bus.emit('start')
      }

      if (this.counter === 20) {
        this.state = {
          mode: 'active',
          time: 10000,
          left: 10000,
          players: [], //and other info
        }
        this.$bus.emit('start')
      }

      if (this.counter === 30) {
        this.state = {
          mode: 'after',
          time: null,
          left: null,
          upWins: true,
        }
        this.$bus.emit('start')
      }

      if (this.counter === 35) {
        this.counter = 0
      } else {
        this.counter++
      }
    })
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
}

.font-oswald {
  font-family: 'Oswald', sans-serif;
  font-optical-sizing: auto;
}
</style>
