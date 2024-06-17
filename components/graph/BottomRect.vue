<template>
  <v-rect :config="config"></v-rect>
</template>

<script>
import { red } from 'tailwindcss/colors'

export default {
  props: ['stage'],
  computed: {
    config() {
      return {
        width: this.stage.width,
        height: this.stage.height,
        fillLinearGradientEndPoint: { x: 50, y: this.stage.height },
        fillLinearGradientColorStops: [0.5, red['500'], 1, '#09090b'],
        fillLinearGradientStartPoint: { x: 50, y: 0 },
        x: 0,
        y: 0,
      }
    },
  },
}
</script>
