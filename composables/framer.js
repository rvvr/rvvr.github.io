import throttle from 'lodash.throttle'

let stopped = true
let callBack = null

const run = throttle(() => {
  if (stopped) return
  callBack()
  window.requestAnimationFrame(run)
}, 20)

export class Framer {
  static start(cb) {
    stopped = false
    callBack = cb
    run()
  }

  static stop() {
    stopped = true
    callBack = null
  }
}
