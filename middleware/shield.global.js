export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return

  const userStore = useUserStore()
  console.log(userStore.user.user_id, userStore.token, userStore.appUser.id)
  if (userStore.user.user_id && userStore.token && userStore.appUser.id) return

  showError({
    statusCode: 403,
    statusMessage: 'Forbidden',
  })
})
