const e = {
  statusCode: 403,
  statusMessage: 'Forbidden',
}

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()

  userStore.getUserFromApp()
  if (isDev()) userStore.appUser.id = 1524648
  if (!userStore.appUser.id) return

  await userStore.getToken()
  if (isDev()) userStore.token = 'test'
  if (!userStore.token) return

  await userStore.fetchUser()
  if (!userStore.user.user_id) await userStore.regUser()
  if (!userStore.user.user_id) return

  await userStore.setAvatar()
  console.log('plug')
})
