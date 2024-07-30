<template>
  <v-rect :config="config"></v-rect>
</template>

<script>
import { lime } from 'tailwindcss/colors'

export default {
  props: ['stage', 'freezeY', 'currentX', 'start', 'finish'],

  computed: {
    width() {
      if (!this.start && !this.finish) return 0
      let end
      if (!this.finish || this.finish < this.start) {
        end = this.currentX
      } else {
        end = this.finish
      }

      return end - this.start
    },

    config() {
      return {
        width: this.width,
        height: this.freezeY,
        fill: lime['800'],
        x: this.start,
        y: 0,
      }
    },
  },
}
</script>
