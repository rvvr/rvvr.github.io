<template>
  <v-line
    v-if="x !== null"
    :config="{ points: [x, 0, x, stage.height], stroke: '#f4d56f', strokeWidth: 1 }"
  ></v-line>
</template>

<script>
export default {
  props: ['x', 'stage'],
}
</script>
