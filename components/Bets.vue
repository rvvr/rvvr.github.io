<template>
  <div class="font-oswald grid grid-cols-2 gap-4 px-4 py-1">
    <button class="up btn h-16 border-2 border-lime-700 bg-lime-500 text-3xl font-bold uppercase text-white">
      Up
    </button>
    <button class="down btn h-16 border-2 border-red-700 bg-red-500 text-3xl font-bold uppercase text-white">
      Down
    </button>
  </div>
  <div class="grid grid-cols-7 gap-2 p-4">
    <button
      v-for="bet in bets"
      @click="betRate = bet"
      :class="[bet === betRate ? 'text-white' : 'btn-outline']"
      :key="bet"
      class="font-oswald btn btn-success border-2 text-lg"
    >
      {{ bet }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      betRate: 5,
      bets: [5, 10, 15, 25, 50, 100, 200],
    }
  },
}
</script>

<style>
.down {
  box-shadow:
    0 3px 0 0px rgba(190, 31, 31, 0.95),
    0 4px 0 0px rgb(119, 0, 0);
}
.up {
  box-shadow:
    0 3px 0 0px rgba(88, 145, 30, 0.95),
    0 4px 0 0px rgb(50, 71, 21);
}
</style>
