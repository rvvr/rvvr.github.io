<template>
  <v-line
    :config="{
      stroke: '#f4d56f',
      strokeWidth: 1,
      points: [0, currentY, stage.width, currentY],
    }"
  ></v-line>
</template>

<script>
export default {
  props: ['stage', 'currentY'],
}
</script>
