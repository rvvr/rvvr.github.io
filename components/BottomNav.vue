<template>
  <div class="bg-ne btm-nav h-14 overflow-hidden bg-base-200 drop-shadow-md">
    <NuxtLink active-class="active text-neutral-content bg-base-200" to="/home">
      <button class="h-5 w-6">
        <IconsWallet class="h-5 w-5" />
      </button>
      <span class="btm-nav-label text-xs">Wallet</span>
    </NuxtLink>

    <NuxtLink active-class="active text-neutral-content bg-base-200" to="/games">
      <button class="h-5 w-6">
        <IconsTrophy class="h-5 w-5" />
      </button>
      <span class="btm-nav-label text-xs">Games</span>
    </NuxtLink>

    <NuxtLink active-class="active text-neutral-content bg-base-200" to="/friends">
      <button class="h-5 w-6">
        <IconsFriends class="h-6 w-6" />
      </button>
      <span class="btm-nav-label text-xs">Friends</span>
    </NuxtLink>

    <NuxtLink active-class="active text-neutral-content bg-base-200" to="/exchange">
      <button class="h-5 w-6">
        <IconsBull class="h-6 w-6" />
      </button>
      <span class="btm-nav-label text-xs">Airdrop</span>
    </NuxtLink>
  </div>
</template>
