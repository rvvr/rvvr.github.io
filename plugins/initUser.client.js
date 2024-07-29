export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()

  userStore.getUserFromApp()
  if (!userStore.appUser.id) return

  await userStore.getToken()
  if (!userStore.token) return

  await userStore.fetchUser()
  if (!userStore.user.user_id) await userStore.regUser()
  if (!userStore.user.user_id) return

  await userStore.setAvatar()
})
