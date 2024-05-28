<template>
  <div class="flex min-h-dvh flex-col justify-between">
    <Navbar />

    <div class="font-oswald">
      <div class="flex items-center justify-between p-4">
        <div class="text-lime-400">
          <div class="text-1xl font-bold uppercase opacity-75">Up pool payout</div>
          <div class="font-black">
            <span class="text-3xl">17.0</span><span class="text-1xl font-normal">(0.0)</span>
          </div>
          <div class="text-2xl font-medium">177<span class="text-base font-normal">%</span></div>
        </div>

        <Timer></Timer>

        <div class="text-right text-red-500">
          <div class="text-1xl font-bold uppercase opacity-75">Up pool payout</div>
          <div class="font-black">
            <span class="text-1xl font-normal">(0.0)</span>
            <span class="text-3xl">17.0</span>
          </div>
          <div class="text-2xl font-medium">177<span class="text-base font-normal">%</span></div>
        </div>
      </div>
    </div>

    <Graph />

    <div class="font-oswald grid grid-cols-4 gap-4 px-4 py-1 uppercase">
      <div class="">3 players</div>
      <div class="text-right font-bold text-lime-500">30.0</div>
      <div class="font-bold text-red-500">60.0</div>
      <div class="text-right">4 players</div>
    </div>
    <div class="grid grid-cols-2 gap-4 px-4 py-1">
      <div class="avatar-group -space-x-3 rtl:space-x-reverse">
        <div v-for="i in 5" class="avatar h-10 w-10 border-base-100 bg-base-300">
          <div class="h-8 w-8">
            <img :src="`https://robohash.org/${i}.png?set=set3`" />
          </div>
        </div>
        <div class="avatar placeholder h-10 w-10">
          <div class="h-8 w-8 bg-neutral text-neutral-content">
            <span>+9</span>
          </div>
        </div>
      </div>
      <div class="avatar-group justify-end -space-x-3 rtl:space-x-reverse">
        <div v-for="i in 4" class="avatar h-10 w-10 border-base-100 bg-base-300">
          <div class="h-8 w-8">
            <img :src="`https://robohash.org/${i}.png?set=set3`" />
          </div>
        </div>
      </div>
    </div>

    <Bets />

    <!-- <footer class="footer footer-center rounded bg-base-200 p-10 text-base-content">
      <nav class="grid grid-flow-col gap-4">
        <a class="link-hover link">About us</a>
        <a class="link-hover link">Contact</a>
        <a class="link-hover link">Jobs</a>
        <a class="link-hover link">Press kit</a>
      </nav>
      <aside>
        <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
      </aside>
    </footer> -->
  </div>
</template>

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
