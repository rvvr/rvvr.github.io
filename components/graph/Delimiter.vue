<template>
  <v-line :config="config"></v-line>
</template>

<script>
export default {
  props: ['stage', 'currentY'],
  computed: {
    config() {
      return {
        stroke: 'white',
        strokeWidth: 1,
        points: [0, this.currentY, this.stage.width, this.currentY],
      }
    },
  },
}
</script>
