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
        fillLinearGradientColorStops: [0, '#09090b', 0.5, 'transparent'],
        fillLinearGradientStartPoint: { x: 20, y: 0 },
        height: 20,
        x: 0,
        y: 0,
      }
    },
  },
}
</script>

<style></style>
