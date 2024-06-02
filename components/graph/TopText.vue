<template>
  <v-text :config="config"></v-text>
</template>

<script>
export default {
  props: ['stage', 'text'],
  computed: {
    config() {
      return {
        x: 0,
        y: 16,
        text: 'UP OR DOWN?\nPLACE YOUR TRADE!',
        fontSize: 18,
        fontFamily: 'Oswald',
        fill: 'yellow',
        align: 'center',
        fontStyle: 'bold',
        width: this.stage.width,
        text: this.text,
        stroke: '#000',

        strokeWidth: 1,
        fillAfterStrokeEnabled: true,
      }
    },
  },
}
</script>
