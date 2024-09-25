<template>
  <NavbarView>
    <template #center>
      <div class="font-bold text-neutral-content">Games</div>
    </template>
  </NavbarView>

  <div class="h-full flex-1 p-4">
    <div class="font-oswald card-title">Boost your wallet balance with games!</div>
    <p class="mt-2 text-sm opacity-50">
      Dive into our selection of exciting games and earn rewards that will boost your account.
    </p>

    <div class="mt-6 grid grid-cols-2 gap-4">
      <NuxtLink to="/games/boost/rocket">
        <div class="card card-compact relative bg-white bg-opacity-10 shadow-sm">
          <div class="card-body items-center">
            <img class="mx-auto h-16 w-auto" src="/rocket.png" />
            <p class="font-oswald">Rocket</p>
          </div>
        </div>
      </NuxtLink>
      <NuxtLink to="/games/boost/trade">
        <div class="card card-compact relative bg-white bg-opacity-10 shadow-sm">
          <div class="card-body items-center">
            <img class="mx-auto h-16 w-auto" src="/trade.png" />
            <p class="font-oswald">Trade</p>
          </div>
        </div>
      </NuxtLink>
    </div>

    <div class="font-oswald card-title mt-6">Freeroll tournaments</div>
    <p class="mt-2 text-sm opacity-50">
      Freeroll tournaments provide a unique and valuable opportunity for players.
    </p>

    <div class="mt-6 grid grid-cols-2 gap-4">
      <NuxtLink to="/games/rooms/?game_type=rocket">
        <div class="card card-compact relative bg-white bg-opacity-10 shadow-sm">
          <div class="card-body items-center">
            <img class="mx-auto h-16 w-auto" src="/rocket.png" />
            <p class="font-oswald">Rocket</p>
          </div>
        </div>
      </NuxtLink>
      <NuxtLink to="/games/rooms">
        <div class="card card-compact relative bg-white bg-opacity-10 shadow-sm">
          <div class="card-body items-center">
            <img class="mx-auto h-16 w-auto" src="/trade.png" />
            <p class="font-oswald">Trade</p>
          </div>
        </div>
      </NuxtLink>
    </div>

    <NuxtLink to="/games/rooms/rewards">
      <button class="font-oswald btn btn-neutral my-4 w-full text-lg leading-none">
        <IconsTrophy class="h-4 w-4 text-neutral-content" />
        <span>My rewards</span>
      </button>
    </NuxtLink>
  </div>
</template>
