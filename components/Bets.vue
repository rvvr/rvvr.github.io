<template>
  <div class="font-oswald grid grid-cols-2 gap-4 px-4 py-1">
    <button
      class="btn h-16 border-2 border-lime-700 bg-lime-500 text-3xl font-bold uppercase text-white shadow-md shadow-lime-300"
    >
      Up
    </button>
    <button
      class="btn h-16 border-2 border-red-700 bg-red-500 text-3xl font-bold uppercase text-white shadow-md shadow-red-300"
    >
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

<style></style>
