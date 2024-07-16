<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
import nuxtStorage from 'nuxt-storage'
const { getData, setData } = nuxtStorage.localStorage

export default {
  mounted() {
    const wallet = getData('wallet')
    if (!wallet) setData('wallet', 0)
  },
}
</script>
