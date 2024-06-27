<template>
  <NavbarView>
    <template #center>
      <div class="font-bold text-neutral-content">Freeroll rooms</div>
    </template>
  </NavbarView>

  <div class="px-4">
    <div class="tabs tabs-bordered tabs-lg mb-2" role="tablist ">
      <NuxtLink class="tab" active-class="tab-active" role="tab" to="/rooms/active/">Active</NuxtLink>
      <NuxtLink class="tab" active-class="tab-active" role="tab" to="/rooms/available/">Available</NuxtLink>
    </div>
  </div>

  <NuxtPage />
</template>

<script>
export default {
  setup() {
    definePageMeta({
      middleware(to) {
        if (to.matched.length === 2) {
          return navigateTo('/rooms/active/')
        }
      },
    })
  },
}
</script>
