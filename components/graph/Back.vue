<template>
  <v-image :config="config"></v-image>
</template>

<script>
export default {
  props: ['stage'],
  data() {
    return {
      image: null,
    }
  },
  created() {
    const image = new window.Image()
    image.src = '/btc.png'
    image.onload = () => (this.image = image)
  },
  computed: {
    config() {
      const size = this.stage.width / 2
      const offset = size / 2
      return {
        width: size,
        height: size,
        opacity: 0.05,
        image: this.image,
        x: size - offset,
        y: this.stage.height / 2 - offset,
      }
    },
  },
}
</script>
