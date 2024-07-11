let manage
let on = false
const tick = 100

const getTime = () => performance.now()

export const timer = {
  start: () => {
    if (on) return
    on = true
    let zero = getTime()
    manage = () => {
      const now = getTime()
      if (getTime() - zero > tick) {
        const offset = now - zero - tick
        zero = getTime() + offset
        useNuxtApp().$bus.emit('nanoSec')
      }
      if (on) {
        window.requestAnimationFrame(manage)
      }
    }
    window.requestAnimationFrame(manage)
  },

  stop: () => {
    on = false
  },
}
