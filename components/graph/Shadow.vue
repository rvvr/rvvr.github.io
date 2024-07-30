<template>
  <v-rect
    :config="{
      fillLinearGradientEndPoint: { x: stage.height, y: stage.height },
      fillLinearGradientStartPoint: { x: stage.height, y: 0 },
      height: stage.height,
      width: stage.width,
      x: 0,
      y: 0,
      fillLinearGradientColorStops: [
        0,
        'rgba(9, 9, 11, 1)',
        0.2,
        'transparent',
        0.8,
        'transparent',
        1,
        'rgba(9, 9, 11, 1)',
      ],
    }"
  ></v-rect>
</template>

<script>
export default {
  props: ['stage'],
}
</script>
