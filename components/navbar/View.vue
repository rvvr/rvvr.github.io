<template>
  <div class="navbar fixed top-0 z-10 grid grid-cols-[48px_auto_48px] justify-items-center gap-2 bg-base-100">
    <slot v-if="$slots.left" name="left" />
    <NuxtLink v-else class="flex w-10 justify-center" to="/">
      <img class="h-10 w-10" alt="" src="/favicon.png" />
    </NuxtLink>

    <slot v-if="$slots.center" name="center" />
    <div v-else></div>

    <slot v-if="$slots.right" name="right" />
    <NavbarAvatar v-else />
  </div>
</template>
