<template>
  <v-rect :config="config"></v-rect>
</template>

<script>
import { lime } from 'tailwindcss/colors'

export default {
  props: ['stage', 'freezeY', 'currentX', 'start', 'finish', 'currentY'],

  data() {
    return {
      winColor: false,
    }
  },

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

    hightLight() {
      return this.currentY < this.freezeY ? lime['700'] : lime['800']
    },

    fill() {
      return this.winColor || lime['800']
    },

    config() {
      return {
        width: this.width,
        height: this.freezeY,
        fill: this.finish ? this.fill : this.hightLight,
        x: this.start,
        y: 0,
      }
    },
  },

  methods: {
    manageWinner(side) {
      this.winColor = side === 'up' ? lime['700'] : null
    },
  },

  mounted() {
    this.$bus.on('winner', this.manageWinner)
  },
  unmounted() {
    this.$bus.off('winner', this.manageWinner)
  },
}
</script>
