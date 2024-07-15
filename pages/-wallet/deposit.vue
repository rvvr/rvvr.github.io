<template>
  <template v-if="wallet?.balance">
    <div class="mb-2 flex items-center text-lg font-bold">
      <img :src="wallet.icon" class="mr-1 w-4" alt="" />
      Wallet deposit
    </div>

    <label class="form-control mt-2 w-full">
      <div class="label">
        <span class="label-text-alt">Wallet balance</span>
      </div>
      <input
        :value="wallet.balance"
        class="input input-bordered w-full !text-base-content"
        disabled
        placeholder="Enter your withdraw Address"
        type="text"
      />
    </label>

    <label class="form-control mt-2 w-full">
      <div class="label">
        <span class="label-text-alt">Deposit Amount</span>
        <span class="label-text-alt">Minimum deposit: 1</span>
      </div>
      <div class="join">
        <input class="input join-item input-bordered w-full" placeholder="0.00" type="text" />
        <button class="btn btn-square join-item">25%</button>
        <button class="btn btn-square join-item">50%</button>
        <button class="btn btn-square join-item">100%</button>
      </div>
    </label>

    <div class="btn btn-neutral mt-6 w-full">Deposit</div>

    <div class="divider mb-7 mt-8">OR</div>
  </template>

  <div class="mb-2 flex items-center text-lg font-bold">
    <IconsBot class="mr-1 w-4" />
    Bot deposit
  </div>
  <p class="pl-5 opacity-50">
    You can deposit through Telegram Bots. Choose one of the bots shown below and deposit without delay.
  </p>
  <div class="mt-5 grid grid-cols-2 gap-2">
    <button class="btn bg-[#447BDD] text-white hover:bg-[#447BDD]">@wallet</button>
    <button class="btn bg-[#59C0FF] text-white hover:bg-[#59C0FF]">@cryptobot</button>
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
import { mapState } from '~/node_modules/pinia/dist/pinia'

export default {
  computed: {
    ...mapState(useWalletStore, ['wallet']),
  },
}
</script>
