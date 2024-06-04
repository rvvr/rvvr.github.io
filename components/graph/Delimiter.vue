<template>
  <v-line :config="config"></v-line>
</template>

<script>
export default {
  props: ['stage', 'currentY'],
  computed: {
    config() {
      return {
        stroke: '#ffe7a3',
        strokeWidth: 1,
        points: [0, this.currentY, this.stage.width, this.currentY],
      }
    },
  },
}
</script>
