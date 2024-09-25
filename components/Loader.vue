<template>
  <slot v-if="data?.length" />
  <slot v-else-if="data" name="empty" />
  <div v-else class="text-center">
    <span class="loading loading-ball loading-lg text-neutral-content"></span>
  </div>
</template>

<script>
export default {
  props: ['data'],
}
</script>
