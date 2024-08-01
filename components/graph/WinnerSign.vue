<template>
  <v-text :config="config"></v-text>
</template>

<script>
export default {
  props: ['finishX', 'freezeY', 'winSide'],

  computed: {
    config() {
      return {
        x: this.finishX - 96 || -100,
        y: this.freezeY + (this.winSide === 'up' ? -50 : 50),
        fill: '#f9f7fd',
        text: 'WIN',
        fontFamily: 'Oswald',
        fontSize: 28,
        align: 'center',
        width: 96,

        shadowColor: 'black',
        shadowOffset: { x: -1, y: 0 },
      }
    },
  },
}
</script>
