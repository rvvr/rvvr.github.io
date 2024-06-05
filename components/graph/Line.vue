<template>
  <v-line :config="config"></v-line>
</template>

<script>
export default {
  props: ['points', 'stage'],
  computed: {
    config() {
      return {
        points: this.points,
        stroke: 'yellow',
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round',
        shadowColor: '#151513',
        shadowOffset: { x: -1, y: 0 },
      }
    },
  },
}
</script>

<style></style>
