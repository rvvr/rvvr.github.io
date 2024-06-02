<template>
  <v-rect :config="config"></v-rect>
</template>

<script>
export default {
  props: ['stage'],
  computed: {
    config() {
      return {
        width: this.stage.width,
        fillLinearGradientEndPoint: { x: 20, y: 20 },
        fillLinearGradientColorStops: [0, 'transparent', 0.5, 'rgba(9, 9, 11, .3)'],
        fillLinearGradientStartPoint: { x: 20, y: 0 },
        height: 20,
        x: 0,
        y: this.stage.height - 20,
      }
    },
  },
}
</script>

<style></style>
