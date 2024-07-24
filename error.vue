<template>
  <div>
    <div class="text-center">{{ error.statusCode }}<br />{{ error.message }}</div>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>
