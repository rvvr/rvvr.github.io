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
