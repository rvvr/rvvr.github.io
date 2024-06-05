<template>
  <v-line :config="{ points: [x, 75, x, stage.height], stroke: '#f4d56f', strokeWidth: 1 }"></v-line>
</template>

<script>
export default {
  props: ['x', 'stage'],
}
</script>
