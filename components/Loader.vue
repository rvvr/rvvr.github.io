<template>
  <slot v-if="data?.length" />
  <slot name="empty" v-else-if="data" />
  <div v-else class="text-center">
    <span class="loading loading-ball loading-lg text-neutral-content"></span>
  </div>
</template>

<script>
export default {
  props: ['data'],
}
</script>
