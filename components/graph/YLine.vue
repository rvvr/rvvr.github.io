<template>
  <v-line :config="{ points: [x, 0, x, stage.height], stroke: 'white', strokeWidth: 1 }"></v-line>
</template>

<script>
export default {
  props: ['x', 'stage'],
}
</script>

<style></style>
