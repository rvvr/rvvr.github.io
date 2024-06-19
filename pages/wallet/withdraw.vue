<template>
  <div class="mb-2 flex items-center text-lg font-bold">
    <IconsUsb class="mr-1 h-4" />
    Withdraw through Blockchain
  </div>
  <p class="mb-4 pl-5 opacity-50">
    Direct withdrawal trough blockchain can take up to 10 minutes. Please be patient!
  </p>

  <label class="form-control mt-2 w-full">
    <div class="label">
      <span class="label-text-alt">Withdraw Address</span>
    </div>
    <input
      :value="wallet.address"
      class="input input-bordered w-full"
      placeholder="Enter your withdraw Address"
      type="text"
    />
  </label>

  <label class="form-control mt-2 w-full">
    <div class="label">
      <span class="label-text-alt">Withdraw Amount</span>
      <span class="label-text-alt">Minimum withdrawal: 1</span>
    </div>
    <div class="join">
      <input class="input join-item input-bordered w-full" type="text" value="0.00" />
      <button class="btn btn-square join-item">25%</button>
      <button class="btn btn-square join-item">50%</button>
      <button class="btn btn-square join-item">100%</button>
    </div>
  </label>

  <div class="btn btn-neutral mt-6 w-full">Withdraw</div>
</template>

<script>
import { mapState } from '~/node_modules/pinia/dist/pinia'

export default {
  computed: {
    ...mapState(useUserStore, ['wallet']),
  },
}
</script>
