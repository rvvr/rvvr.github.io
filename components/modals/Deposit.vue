<template>
  <div class="modal-box p-4">
    <div class="mb-4 flex justify-center py-2 text-neutral-content">
      <IconsWalletColor class="h-24" />
    </div>
    <h3 class="text-center text-lg font-bold">Insufficient balance</h3>
    <p class="py-2 text-center">
      You don't have enough funds to complete this action. Please top up your account to proceed
    </p>

    <div class="modal-action">
      <form class="flex w-full justify-between" method="dialog">
        <button class="btn btn-ghost">Close</button>
        <button @click.prevent="navigateTo('/wallet/deposit')" class="btn btn-neutral w-1/2">Deposit</button>
      </form>
    </div>
  </div>
</template>
