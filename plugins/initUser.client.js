const e = {
  statusCode: 403,
  statusMessage: 'Forbidden',
}

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()

  userStore.getUserFromApp()
  if (isDev()) userStore.appUser.id = 1524648
  console.log('userStore.appUser.id', userStore.appUser.id)
  if (!userStore.appUser.id) showError(e)

  await userStore.getToken()
  if (isDev()) userStore.token = 'test'
  console.log('userStore.token', userStore.token)
  if (!userStore.token) showError(e)

  await userStore.fetchUser()
  if (!userStore.user.user_id) await userStore.regUser()
  console.log('userStore.user.user_id:', userStore.user.user_id)
  if (!userStore.user.user_id) showError(e)

  await userStore.setAvatar()
})
