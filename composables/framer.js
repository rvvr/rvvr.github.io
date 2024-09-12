import throttle from 'lodash.throttle'

let stopped = true
let callBack = null

const run = () => {
  if (stopped) return
  callBack()
  window.requestAnimationFrame(run)
}

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
