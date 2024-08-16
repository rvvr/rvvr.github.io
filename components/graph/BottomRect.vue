<template>
  <v-rect v-if="start !== null" :config="config"></v-rect>
</template>

<script>
import { red } from 'tailwindcss/colors'

export default {
  props: ['stage', 'freezeY', 'currentX', 'start', 'finish', 'currentY'],

  data() {
    return {
      winColor: false,
    }
  },

  computed: {
    width() {
      if (!this.start && this.finish === null) return 0
      let end
      if (this.finish === null || this.finish < this.start) {
        end = this.currentX
      } else {
        end = this.finish
      }

      return end - this.start
    },

    hightLight() {
      return this.currentY > this.freezeY ? red['700'] : red['800']
    },

    fill() {
      return this.winColor || red['800']
    },

    config() {
      return {
        width: this.width,
        height: this.stage.height - this.freezeY,
        fill: this.finish != null ? this.fill : this.hightLight,
        x: this.start,
        y: this.freezeY,
      }
    },
  },

  methods: {
    manageWinner(side) {
      this.winColor = side === 'down' ? red['700'] : null
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
