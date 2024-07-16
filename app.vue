<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
import { getData, setData } from 'nuxt-storage/local-storage'

export default {
  mounted() {
    const wallet = getData('wallet')
    if (!wallet) setData('wallet', 0)
  },
}
</script>
