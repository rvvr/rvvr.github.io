<template>
  <div class="mb-2 flex items-center text-lg font-bold">
    <IconsFlash class="mr-1 h-4" />
    Express deposit
  </div>
  <p class="pl-5 opacity-50">
    You can deposit through Telegram Bots. Choose one of the bots shown below and deposit without delay.
  </p>
  <div class="mt-5 grid grid-cols-2 gap-2">
    <button class="btn btn-info text-white">@wallet</button>
    <button class="btn btn-secondary">@cryptobot</button>
  </div>
  <div class="divider mb-7 mt-8">OR</div>
  <div class="mb-2 flex items-center text-lg font-bold">
    <IconsUsb class="mr-1 h-4" />
    Deposit through Blockchain
  </div>
  <p class="pl-5 opacity-50">
    Direct deposits trough blockchain can take up to 10 minutes. Please be patient!
  </p>

  <div class="join mt-5 w-full">
    <label class="form-control w-full flex-1">
      <input
        class="input join-item input-bordered w-full"
        placeholder="Type here"
        type="text"
        value="UQCr5ieszI47RnjiZVpc8WiIOTSnQ55oqXc16DLJwePfP1c7"
      />
      <div class="label">
        <span class="label-text-alt">Your personal TON Deposit address</span>
      </div>
    </label>
    <button class="btn btn-square join-item">
      <IconsCopy />
    </button>
  </div>

  <div class="mt-4 flex text-sm text-primary opacity-40">
    <IconsInfo class="mr-1 h-4" />
    <span>
      Depositing any other currency to this deposit address may make your money lost forever. Always
      doublecheck the deposit address when sending funds.
    </span>
  </div>
</template>

<script>
export default {}
</script>
