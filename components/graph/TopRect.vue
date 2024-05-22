<template>
  <v-rect :config="config"></v-rect>
</template>

<script>
import { lime } from 'tailwindcss/colors'

export default {
  props: ['stage', 'currentY'],
  computed: {
    config() {
      return {
        width: this.stage.width,
        height: this.currentY,
        fillLinearGradientEndPoint: { x: 50, y: this.stage.height },
        fillLinearGradientColorStops: [0, '#09090b', 0.5, lime['500']],
        fillLinearGradientStartPoint: { x: 50, y: 0 },
        x: 0,
        y: 0,
      }
    },
  },
}
</script>
