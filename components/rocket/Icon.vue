<template>
  <v-image
    :config="{
      image: rocket,
      width: 48,
      height: 48,
      x: currentX,
      y: currentY,
      offsetY: 24,
    }"
  />

  <v-image
    v-if="!live"
    :config="{
      image: bang,
      width: 90,
      height: 90,
      offsetY: 45,
      offsetX: 25,
      x: currentX,
      y: currentY,
    }"
  />
</template>

<script>
export default {
  props: ['currentX', 'currentY', 'live'],
  data() {
    return {
      rocket: null,
      bang: null,
      scale: 0,
    }
  },
  created() {
    this.loadImg('/rocket-svgrepo-com.png', 'rocket')
    this.loadImg('/bang.png', 'bang')
  },

  methods: {
    loadImg(src, name) {
      const image = new window.Image()
      image.src = src
      image.onload = () => (this[name] = image)
    },
  },
}
</script>
