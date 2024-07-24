export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()

  console.log('plu start')
  userStore.getUserFromApp()
  if (isDev()) userStore.appUser.id = 1524648
  if (!userStore.appUser.id) return

  await userStore.getToken()
  if (isDev()) userStore.token = 'test'
  if (!userStore.token) return

  await userStore.fetchUser()
  if (!userStore.user.user_id) {
    await userStore.regUser()
  }

  await userStore.setAvatar()
  console.log('plug end')
})
