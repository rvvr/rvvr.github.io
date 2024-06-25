<template>
  <NavbarView>
    <template #left><div /></template>
    <template #center>
      <div class="font-bold text-neutral-content">Room rating</div>
    </template>
    <template #right>
      <NuxtLink :to="`/rooms/${$route.params.room}`"><NavbarClose /></NuxtLink>
    </template>
  </NavbarView>
</template>
