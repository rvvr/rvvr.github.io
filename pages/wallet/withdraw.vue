<template>
  <div class="mb-2 flex items-center text-xl font-bold text-neutral-content">
    <IconsUsb class="mr-1 h-4" />
    Withdraw through Blockchain
  </div>
  <p>Direct withdrawal trough blockchain can take up to 10 minutes. Please be patient!</p>

  <label class="form-control mt-4 w-full">
    <div class="label">
      <span class="label-text-alt">Withdraw Address</span>
    </div>
    <input class="input input-bordered w-full" placeholder="Enter your withdraw Address" type="text" />
  </label>

  <label class="form-control mt-4 w-full">
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

  <div class="btn btn-info mt-4 w-full text-white">Withdraw</div>
</template>

<script>
export default {}
</script>

<style></style>
