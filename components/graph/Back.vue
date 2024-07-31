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
    image.src = '/btcw.png'
    image.onload = () => (this.image = image)
  },
  computed: {
    config() {
      const size = this.stage.height / 2
      const offset = size / 2
      return {
        width: size,
        height: size,
        opacity: 0.03,
        image: this.image,
        x: this.stage.width / 2 - offset,
        y: this.stage.height / 2 - offset,
      }
    },
  },
}
</script>
