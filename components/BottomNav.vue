<template>
  <div class="btm-nav bg-base-200">
    <NuxtLink active-class="active text-neutral-content bg-base-200" to="/wallet">
      <button>
        <IconsWallet class="h-5 w-5" />
      </button>
    </NuxtLink>

    <NuxtLink active-class="active text-neutral-content bg-base-200" to="/">
      <button>
        <IconsHome class="h-5 w-5" />
      </button>
    </NuxtLink>

    <NuxtLink active-class="active text-neutral-content bg-base-200" to="/rooms">
      <button>
        <IconsFree class="h-6 w-6" />
      </button>
    </NuxtLink>
  </div>
</template>
