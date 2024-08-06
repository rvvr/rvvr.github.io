import mitt from 'mitt'

export default defineNuxtPlugin((nuxtApp) => {
  const { emit, on, off } = mitt()

  nuxtApp.provide('bus', { emit, on, off })
})
