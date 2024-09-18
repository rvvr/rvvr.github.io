<template>
  <NavbarView>
    <template #center>
      <div class="font-bold text-neutral-content">Boost games</div>
    </template>
  </NavbarView>

  <div class="h-full flex-1 p-4">
    <div class="font-oswald card-title">Boost your wallet balance with games!</div>
    <p class="mt-2 text-sm opacity-50">
      You can increase your wallet balance by playing fun games? Dive into our selection of exciting games and
      earn rewards that will boost your account. The more you play, the more you earn!
    </p>

    <div class="mt-6 grid grid-cols-2 gap-4">
      <NuxtLink to="/boost/rocket">
        <div class="card card-compact relative bg-white bg-opacity-10 shadow-sm">
          <div class="card-body items-center">
            <img class="mx-auto h-16 w-auto" src="/rocket.png" />
            <p class="font-oswald">Rocket</p>
          </div>
        </div>
      </NuxtLink>
      <NuxtLink to="/boost/trade">
        <div class="card card-compact relative bg-white bg-opacity-10 shadow-sm">
          <div class="card-body items-center">
            <img class="mx-auto h-16 w-auto" src="/trade.png" />
            <p class="font-oswald">Trade</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
