export default defineNuxtPlugin((nuxtApp) => {
  let zero = performance.now()
  let counter = 0
  const manage = () => {
    if (performance.now() - zero > 100) {
      nuxtApp.$bus.emit('nanoSec')
      counter++
      if (counter === 10) {
        nuxtApp.$bus.emit('sec')
        counter = 0
      }
      zero = performance.now()
    }
    window.requestAnimationFrame(manage)
  }
  window.requestAnimationFrame(manage)
})
