<template>
  <div class="btm-nav">
    <NuxtLink active-class="active text-neutral-content" to="/wallet">
      <button>
        <IconsWallet class="h-5 w-5" />
      </button>
    </NuxtLink>

    <NuxtLink active-class="active text-neutral-content" to="/">
      <button>
        <IconsGraph class="h-5 w-5" />
      </button>
    </NuxtLink>

    <NuxtLink active-class="active text-neutral-content" to="/rooms">
      <button>
        <IconsFree class="h-6 w-6" />
      </button>
    </NuxtLink>
  </div>
</template>
