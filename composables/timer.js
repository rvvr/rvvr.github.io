import throttle from 'lodash.throttle'

const action = throttle(() => {
  useNuxtApp().$bus.emit('nanoSec')
}, 100)

const run = () => {
  if (stopped) return
  action()
  window.requestAnimationFrame(run)
}

let stopped = true

export class Timer {
  static start() {
    stopped = false
    run()
  }

  static stop() {
    stopped = true
  }
}
