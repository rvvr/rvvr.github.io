export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()

  userStore.getUserFromApp()
  if (isDev()) userStore.appUser.id = 1524648
  if (!userStore.appUser.id) return

  await userStore.getToken()
  if (isDev()) userStore.token = '132ba3cb70a061eb43b727028ccda41b'
  if (!userStore.token) return

  await userStore.fetchUser()
  if (!userStore.user.user_id) await userStore.regUser()
  if (!userStore.user.user_id) return

  await userStore.setAvatar()
})
