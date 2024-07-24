<template>
  <div class="bg-ne btm-nav overflow-hidden bg-base-200 drop-shadow-md">
    <NuxtLink active-class="active text-neutral-content bg-base-200" to="/">
      <button class="h-6 w-6">
        <IconsWallet class="h-5 w-5" />
      </button>
      <span class="btm-nav-label text-sm">Wallet</span>
    </NuxtLink>

    <NuxtLink active-class="active text-neutral-content bg-base-200" to="/boost">
      <button class="h-6 w-6">
        <IconsHome class="h-5 w-5" />
      </button>
      <span class="btm-nav-label text-sm">Boost</span>
    </NuxtLink>

    <NuxtLink active-class="active text-neutral-content bg-base-200" to="/rooms">
      <button class="h-6 w-6">
        <IconsFree class="h-6 w-6" />
      </button>
      <span class="btm-nav-label text-sm">Freerolls</span>
    </NuxtLink>

    <NuxtLink active-class="active text-neutral-content bg-base-200" to="/friends">
      <button class="h-6 w-6">
        <IconsFriends class="h-6 w-6" />
      </button>
      <span class="btm-nav-label text-sm">Friends</span>
    </NuxtLink>

    <NuxtLink active-class="active text-neutral-content bg-base-200" to="/friends">
      <button class="h-6 w-6">
        <IconsBull class="h-6 w-6" />
      </button>
      <span class="btm-nav-label text-sm">Exchange</span>
    </NuxtLink>
  </div>
</template>
