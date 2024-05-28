export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('bus', {
    emit: nuxtApp.hooks.callHook,
    on: nuxtApp.hooks.hook,
    off: nuxtApp.hooks.removeHook.bind(nuxtApp.hooks),
  })
})
