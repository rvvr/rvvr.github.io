<template>
  <NavbarView>
    <template #center>
      <div class="join">
        <NuxtLink :to="`/rooms/${$route.params.room}/rating`">
          <NavbarBalance />

          <button class="btn btn-secondary join-item btn-lg -mt-8 pt-4">
            <IconsTrophy class="h-4 w-4 opacity-80" />
            <span class="font-oswald text-xl font-bold leading-none">2/6</span>
          </button>
        </NuxtLink>
      </div>
    </template>
  </NavbarView>

  <Game />
</template>
