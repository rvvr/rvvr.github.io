export default defineNuxtPlugin((nuxtApp) => {
  let zero = performance.now()
  const manage = () => {
    if (performance.now() - zero > 100) {
      nuxtApp.$bus.emit('nanoSec')
      zero = performance.now()
    }
    window.requestAnimationFrame(manage)
  }
  window.requestAnimationFrame(manage)
})
