<template>
  <v-image
    v-if="live"
    :config="{
      image: rocket,
      width: 48,
      height: 48,
      x: currentX,
      y: currentY - 24,
    }"
  />

  <v-image
    v-else
    :config="{
      image: bang,
      width: 58,
      height: 58,
      x: currentX - 15,
      y: currentY - 30,
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
