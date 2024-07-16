<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
import localStorage from 'nuxt-storage/local-storage'
const { getData, setData } = localStorage

export default {
  mounted() {
    const wallet = getData('wallet')
    if (!wallet) setData('wallet', 0)
  },
}
</script>
