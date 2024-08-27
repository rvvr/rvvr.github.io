<template>
  <div
    class="navbar fixed top-0 z-10 grid min-h-12 grid-cols-[32px_auto_32px] items-center gap-2 bg-base-200 px-4"
  >
    <slot v-if="$slots.left" name="left" />
    <NuxtLink v-else class="flex w-8 justify-center" to="/home">
      <img class="-ml-2 h-7" alt="" src="/bf.png" />
    </NuxtLink>

    <div class="justify-self-center">
      <slot v-if="$slots.center" name="center" />
    </div>

    <div class="justify-self-end">
      <slot v-if="$slots.right" name="right" />
      <!-- <NuxtLink v-else class="flex w-8 justify-center" to="/wallet"> -->
      <NavbarAvatar v-else class="h-8 w-8" />
      <!-- </NuxtLink> -->
    </div>
  </div>
</template>
