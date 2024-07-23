<template>
  <Loader />
</template>

<script setup>
const { signIn } = useAuth()

definePageMeta({
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' },
  layout: 'empty',
})

onMounted(async () => {
  signIn({ data: window.Telegram?.WebApp.initData })
})
</script>
