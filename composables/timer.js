let manage
let on = true

export const timer = {
  start: () => {
    let zero = performance.now()
    manage = () => {
      if (performance.now() - zero > 90) {
        console.log('nanoSec')
        useNuxtApp().$bus.emit('nanoSec')
        zero = performance.now()
      }
      if (on) {
        window.requestAnimationFrame(manage)
      } else {
        on = true
      }
    }
    window.requestAnimationFrame(manage)
  },

  stop: () => {
    on = false
  },
}
