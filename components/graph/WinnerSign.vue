<template>
  <v-text :config="config"></v-text>
</template>

<script>
export default {
  props: ['finishX', 'freezeY', 'winSide', 'startX'],

  computed: {
    config() {
      const width = this.finishX - this.startX
      return {
        width,
        x: this.finishX - width,
        y: this.freezeY + (this.winSide === 'up' ? -50 : 50),
        fill: '#f9f7fd',
        text: 'WIN',
        fontFamily: 'Oswald',
        fontSize: 28,
        align: 'center',
        shadowColor: 'black',
        shadowOffset: { x: -1, y: 0 },
      }
    },
  },
}
</script>
