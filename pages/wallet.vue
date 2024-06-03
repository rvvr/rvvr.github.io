<template>
  <div class="flex-1 p-4">
    <div class="text-center">
      <div class="font-oswald mb-2 text-6xl font-bold text-lime-500">19.92</div>
      <div class="mb-4 flex items-center justify-center text-neutral-content">
        <span><IconsWallet class="mr-1 h-4 w-4" /></span>
        <span class="font-bold uppercase">You Balance</span>
      </div>
    </div>
    <div class="tabs-boxed tabs mb-5" role="tablist">
      <NuxtLink class="tab" role="tab" to="/wallet/deposit/">
        <IconsArrow class="mr-1 h-4 w-4 rotate-180"></IconsArrow>
        Deposit
      </NuxtLink>
      <NuxtLink class="tab" role="tab" to="/wallet/withdraw/">
        <IconsArrow class="mr-1 h-4 w-4"></IconsArrow>
        Withdraw
      </NuxtLink>
    </div>

    <NuxtPage />
  </div>
</template>

<style lang="postcss">
.router-link-active {
  @apply tab-active;
}
</style>
