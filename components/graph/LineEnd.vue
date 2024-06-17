<template>
  <v-circle :config="config"></v-circle>
</template>

<script>
export default {
  props: ['currentX', 'currentY'],
  computed: {
    config() {
      return {
        radius: 4,
        fill: 'yellow',
        stroke: '#151513',
        strokeWidth: 1,
        x: this.currentX,
        y: this.currentY,
      }
    },
  },
}
</script>
