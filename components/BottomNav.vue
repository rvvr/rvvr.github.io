<template>
  <div class="btm-nav overflow-hidden bg-base-300 drop-shadow-md">
    <NuxtLink active-class="active text-neutral-content bg-black bg-opacity-20" to="/">
      <button>
        <IconsWallet class="h-5 w-5" />
      </button>
      <span class="btm-nav-label text-sm">Wallet</span>
    </NuxtLink>

    <NuxtLink active-class="active text-neutral-content bg-black bg-opacity-20" to="/boost">
      <button>
        <IconsHome class="h-5 w-5" />
      </button>
      <span class="btm-nav-label text-sm">Boost</span>
    </NuxtLink>

    <NuxtLink active-class="active text-neutral-content bg-black bg-opacity-20" to="/rooms">
      <button>
        <IconsFree class="h-6 w-6" />
      </button>
      <span class="btm-nav-label text-sm">Freerolls</span>
    </NuxtLink>
  </div>
</template>
