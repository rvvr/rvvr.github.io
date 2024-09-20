<template>
  <div>
    <div class="grid h-8 grid-cols-3 gap-2 px-4 pt-3">
      <div></div>
      <div class="font-oswald text-center leading-none">
        <span class="opacity-50">Bet:</span>
        <img class="align-center mb-1 ml-2 inline-block h-4 w-4" alt="" src="/coin.png" />
        {{ modelValue }}
      </div>
      <div></div>
    </div>

    <div class="grid grid-cols-[auto_1fr_auto] gap-4 px-4">
      <div>
        <span class="font-bold text-green-500">Min</span>
      </div>
      <div>
        <input
          @input="$emit('update:modelValue', $event.target.value)"
          :max="modelValue > balance ? modelValue : balance"
          :min="1"
          :value="modelValue"
          class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 bg-gradient-to-r from-green-300 via-yellow-300 to-red-300 accent-white"
          step="1"
          type="range"
        />
      </div>
      <div>
        <span class="font-bold text-red-500">Max</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['balance', 'modelValue'],
}
</script>
