<template>
  <NavbarView>
    <template #center>
      <NuxtLink to="/wallet/deposit/">
        <NavbarBalance />
      </NuxtLink>
    </template>
  </NavbarView>

  <Game />
</template>
