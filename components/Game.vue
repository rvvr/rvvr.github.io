<template>
  <div class="font-oswald relative">
    <div class="grid grid-cols-3 items-center px-4 pb-4 pt-1">
      <div class="text-lime-400">
        <Pool side="up" />
      </div>

      <div class="flex justify-center">
        <Timer></Timer>
      </div>

      <div class="text-right text-red-500">
        <Pool side="down" />
      </div>
    </div>

    <MessageBox />
  </div>

  <Graph />
  <Players />
  <Bets />
</template>
