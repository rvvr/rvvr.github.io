<template>
  <div class="bg-ne btm-nav overflow-hidden bg-base-200 drop-shadow-md">
    <NuxtLink active-class="active text-neutral-content bg-[#221551]" to="/">
      <button>
        <IconsWallet class="h-5 w-5" />
      </button>
      <span class="btm-nav-label text-sm">Wallet</span>
    </NuxtLink>

    <NuxtLink active-class="active text-neutral-content bg-[#221551]" to="/boost">
      <button>
        <IconsHome class="h-5 w-5" />
      </button>
      <span class="btm-nav-label text-sm">Boost</span>
    </NuxtLink>

    <NuxtLink active-class="active text-neutral-content bg-[#221551]" to="/rooms">
      <button>
        <IconsFree class="h-6 w-6" />
      </button>
      <span class="btm-nav-label text-sm">Freerolls</span>
    </NuxtLink>
  </div>
</template>
