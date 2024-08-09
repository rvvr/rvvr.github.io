<template>
  <button class="btn btn-neutral btn-lg -mt-9 flex-nowrap pt-6">
    <img :src="`/${fake ? 'point' : 'coin'}.png`" class="mt-0.5 h-5 w-5" alt="" />
    <span class="font-oswald text-xl font-bold leading-none">
      {{ balance }}
    </span>
  </button>
</template>

<script>
export default {
  props: ['balance', 'fake'],
}
</script>
