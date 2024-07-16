<template>
  <div class="btm-nav bg-base-200">
    <NuxtLink active-class="active text-neutral-content bg-base-200" to="/balance">
      <button>
        <IconsWallet class="h-5 w-5" />
      </button>
      <span class="btm-nav-label">Wallet</span>
    </NuxtLink>

    <NuxtLink active-class="active text-neutral-content bg-base-200" to="/">
      <button>
        <IconsHome class="h-5 w-5" />
      </button>
      <span class="btm-nav-label">Boost</span>
    </NuxtLink>

    <NuxtLink active-class="active text-neutral-content bg-base-200" to="/rooms">
      <button>
        <IconsFree class="h-6 w-6" />
      </button>
      <span class="btm-nav-label">Freerolls</span>
    </NuxtLink>
  </div>
</template>
