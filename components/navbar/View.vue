<template>
  <div class="navbar fixed top-0 z-10 grid grid-cols-[40px_auto_40px] items-center gap-2 bg-base-200 px-4">
    <slot v-if="$slots.left" name="left" />
    <NuxtLink v-else class="flex w-10 justify-center" to="/home">
      <img class="h-10 w-10" alt="" src="/favicon.png" />
    </NuxtLink>

    <div class="justify-self-center">
      <slot v-if="$slots.center" name="center" />
    </div>

    <div class="justify-self-end">
      <slot v-if="$slots.right" name="right" />
      <NavbarAvatar v-else class="h-10 w-10" />
    </div>
  </div>
</template>
