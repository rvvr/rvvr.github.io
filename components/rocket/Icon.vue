<template>
  <v-image
    :config="{
      image: image,
      width: 48,
      height: 48,
      x: currentX,
      y: currentY - 24,
    }"
  />
</template>

<script>
export default {
  props: ['currentX', 'currentY'],
  data() {
    return {
      image: null,
    }
  },
  created() {
    const image = new window.Image()
    image.src = '/rocket-svgrepo-com.png'
    image.onload = () => (this.image = image)
  },
}
</script>
