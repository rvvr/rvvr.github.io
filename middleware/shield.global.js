export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return

  const userStore = useUserStore()
  if (userStore.user.user_id && userStore.user.token && userStore.appUser.id) return

  showError({
    statusCode: 403,
    statusMessage: 'Forbidden',
  })
})
