export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()

  userStore.getUserFromApp()
  if (!userStore.appUser.id) return

  await userStore.auth()
  if (!userStore.user.token) return
})
